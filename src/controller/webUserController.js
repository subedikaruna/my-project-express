import { WebUser } from "../schema/model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import { password, secretKey } from "../validation/constant.js";

export let createWebUserController = async (req, res, next) => {
  try {
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      isVerifiedEmail: false,
      password: hashPassword,
    };
    let result = await WebUser.create(data);

    //send email with link
    //generate token
    //link => fronted link
    //send mail

    let infoObj = {
      _id: result._id,
    };
    let secretKey = "dw13";
    let expiryInfo = {
      expiresIn: "5d",
    };
    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      from: '"Hello" <kctsohil@gmail.com>',
      to: data.email,
      subject: "account create",
      html: `<h1>your account has been created successfully</h1>
         <a href="http://localhost:3000/verify-email?token=${token}">
             "http://localhost:3000/verify-email?token=${token}
            </a>`,
    });

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    console.log(token);

    //verify token
    let infoObj = await jwt.verify(token, secretKey);
    let userId = infoObj._id;
    let result = await WebUser.findByIdAndUpdate(
      userId,
      {
        isVerifiedEmail: true,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      success: true,
      message: "user verified  successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await WebUser.findOne({ email: email });
    if (user) {
      if (user.isVerifiedEmail) {
        let isValidpassword = await bcrypt.compare(password, user.password);
        if (isValidpassword) {
          let infoObj = {
            _id: user._id,
          };

          let expiryInfo = {
            expiresIn: "365d",
          };
          let token = await jwt.sign(infoObj, secretKey, expiryInfo);
          res.status(200).json({
            success: true,
            message: "user login successful.",
            data: user,
            token: token,
          });
        } else {
          let error = new Error("credential does not match");
          throw error;
        }
      } else {
        let error = new Error("credential does not match");
        throw error;
      }
    } else {
      let error = new Error("credential does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let result = await WebUser.findById(_id);
    res.status(200).json({
      success: true,
      message: "profile read successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: " unable to read  profile",
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;

    console.log(_id);

    let result = await WebUser.findByIdAndUpdate(_id, data, { new: true });

    console.log("*****", result);
    res.status(201).json({
      success: true,
      message: "profile updated successfully",
      data: result,
    });
  } catch (error) {
    req.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    let _id = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let data = await WebUser.findById(_id);
    let hashPassword = data.password;

    let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);
    if (isValidPassword) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);
      let result = await WebUser.findByIdAndUpdate(
        _id,
        {
          password: newHashPassword,
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Updated password successfully.",
        data: result,
      });
    } else {
      let error = new Error("credential does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readAllUser = async (req, res, next) => {
  try {
    let result = await WebUser.find({});
    res.status(200).json({
      success: true,
      message: "All user read successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await WebUser.findById(id);

    res.status(200).json({
      success: true,
      message: " user read successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await WebUser.findByIdAndUpdate(id, data, { new: true });
    console.log(result);
    res.status(201).json({
      success: true,
      message: " user updated successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSpecificUser = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await WebUser.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: " user deleted successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    let email = req.body.email;
    let result = await WebUser.findOne({ email: email }); //result= null or result ={...}
    if (result) {
      let infoObj = {
        _id: result._id,
      };

      let expiryInfo = {
        expiresIn: "5d",
      };
      let token = await jwt.sign(infoObj, secretKey, expiryInfo);

      await sendEmail({
        from: '"Karuna Subedi" <karyanna7@gmail.com>',
        to: email,
        subject: "Reset password",
        html: `<h1>Please click given link to reset your password.</h1>
         <a href="http://localhost:3000/reset-password?token=${token}">
             "http://localhost:3000/reset-password?token=${token}
            </a>`,
      });

      res.status(200).json({
        success: true,
        message: " To reset password link has been sent.",
        //  data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "email does not exist",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result = await WebUser.findByIdAndUpdate(
      req._id,
      {
        password: hashPassword,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Password reset Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ... (rest of the code remains the same)
