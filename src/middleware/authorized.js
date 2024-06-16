import { WebUser } from "../schema/model.js";


let authorized = (roles) => {
  //roles=["admin","superAdmin"]
  return async (req, res, next) => {
    try {
      let _id = req._id;
      let result = await WebUser.findById(_id);
      let tokenRole = result.role; //"admin"
      if (roles.includes(tokenRole)) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "user are not authorize to perform this action",
        });
      }
    } catch (error) {
      res.status(403).json({
        status: "false",
        message: "User not authorized",
      });
    }
  };
};

export default authorized