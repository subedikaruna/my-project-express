import bcrypt from "bcrypt";
import { WebUser } from "../schema/model.js";
import { sendEmail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../validation/constant.js";

export let createWebUserController = async (req, res, next) => {
  let data = req.body; // {name:"...", password: "password123", address: "123 Example St, City, Country"}
  try {
    let password = data.password;
    let hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;

    data = {
      ...data,
      isVerifiedemail: false,
    };

    let result = await WebUser.create(data);

    let infoObj = {
      _id: result._id,
    };

    let expiryInfo = {
      expiresIn: "5d",
    };

    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      from: "Pranav Shrestha<felicific.bird@gmail.com>",
      to: [req.body.email],
      subject: "Registration",
      html: `
            <h1> Your account has been created successfully </h1>

            <a href="http://localhost:3000/verify-email?token=${token}">
            http://localhost:3000/verify-email?token=${token}
            </a>
            `,
    });
    res.status(201).json({
      success: true,
      message: "WebUser created successfully.",
      result: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  //    try{

  //    }
  try {
    let tokenString = req.headers.authorization;

    // console.log(tokenString.split(" ")[1]);
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];

    // console.log(token);
    // let infoObj = await jwt.verify(token, secretKey);
    let infoObj = await jwt.verify(token, secretKey);
    console.log(infoObj);
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
      messgae: "webUser data read successfully.",
    });
  } catch (error) {
    res.status(401).json({
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
    console.log(user);

    if (user) {
      if (user.isVerifiedEmail) {
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          let infoObj = {
            _id: user._id,
          };
          let expiryInfo = {
            expiresIn: "2d",
          };
          let token = await jwt.sign(infoObj, secretKey, expiryInfo);
          res.status(200).json({
            success: true,
            message: "User login successful",
            data: user,
            token: token,
          });
        } else {
          let error = new Error("Credential does not match");
          throw error;
        }
      } else {
        let error = new Error("Credential does not match");
        throw error;
      }
    } else {
      let error = new Error("Credential does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let readWebUserController = async (req, res, next) => {
  try {
    let result = await WebUser.find({}).limit(2);
    res.status(200).json({
      success: true,
      message: "WebUser read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let readSpecificWebUserController = async (req, res, next) => {
  try {
    let result = await WebUser.findById(req.params.id);
    res.json({
      success: true,
      message: "WebUser found successfully.",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let updateWebUserController = async (req, res, next) => {
  try {
    let result = await WebUser.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "WebUser updated successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let deleteWebUserController = async (req, res, next) => {
  try {
    let result = await WebUser.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "WebUser deleted successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let myProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let result = await WebUser.findById(_id);
    res.status(200).json({
      success: true,
      message: "profile read succesfully.",
      data: result,
    });
  } catch (error) {
    res.json({
      success: true,
      messgae: "unable to read profile",
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await WebUser.findByIdAndUpdate(_id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: true,
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
        message: "Password updated sucessfully.",
        data: result,
      });
    } else {
      let error = new Error("Wrong Password");
      throw error;
    }
  } catch (error) {
    res.json({
      success: true,
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

export const readSpecificWebUser = async (req, res, next) => {
  try {
    let id = req.params.id;

    let result = await WebUser.findById(id);

    res.status(200).json({
      success: true,
      message: "User read successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSpecificWebUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;

    delete data.email;
    delete data.password;

    let result = await WebUser.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
      success: true,
      message: "User profile updated successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSpecificWebUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await WebUser.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      messgae: "User delted successfully.",
      data: result,
    });
  } catch (error) {
    res.json({
      success: true,
      message: error.messgae,
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    let email = req.body.email;

    let result = await WebUser.findOne({ email: email });

    if (result) {
      let infoObj = {
        _id: result._id,
      };
      let expiryInfo = {
        expiresIn: "5d",
      };

      let token = await jwt.sign(infoObj, secretKey, expiryInfo);

      await sendEmail({
        from: "Pranav Shrestha<felicific.bird@gmail.com>",
        to: email,
        subject: "Reset Password",
        html: `
                <h1> Please click the link below to reset the password.</h1>
    
                <a href="http://localhost:3000/reset-password?token=${token}">
                http://localhost:3000/reset-password?token=${token}
                </a>
                `,
      });
      res.status(200).json({
        success: true,
        messgae: "Password reset link has been sent",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "email does not exists",
      });
    }
  } catch (error) {
    res.json({
      success: true,
      message: error.messgae,
    });
  }
};

export const resetPassword = async (req, res, next) => {
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
      message: "password reset successfully.",
      data: result,
    });
  } catch (error) {
    res.json({
      success: true,
      message: error.messgae,
    });
  }
};
