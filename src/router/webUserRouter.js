import { Router } from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import { WebUser } from "../schema/model.js";
import authorized from "../middleware/authorized.js";
import { createWebUserController, deleteSpecificUser, forgotPassword, loginUser, myProfile, readAllUser, readSpecificUser, resetPassword, updatePassword, updateProfile, updateSpecificUser, verifyEmail } from "../controller/WebUserController.js";

 //import validation from "../middleware/validation.js";
 //import webUserValidation from "../validation/webUserValidation.js";

let webUserRouter = Router();

webUserRouter.route("/")
.post(createWebUserController)
.get( isAuthenticated,
    authorized(["admin", "superadmin"]),readAllUser);

webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/login").post(loginUser);

webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);

webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);

webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);

webUserRouter.route("/forgot-password").post(forgotPassword);

webUserRouter.route("/reset-password").patch(isAuthenticated, resetPassword);





webUserRouter
  .route("/:id")
  .get(isAuthenticated, authorized(["admin", "superadmin"]), readSpecificUser) //admin,superAdmin
  .patch(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    updateSpecificUser
  ) //admin,superAdmin
  .delete(
    isAuthenticated,
    authorized([ "superadmin"]),
    deleteSpecificUser
  );//superAdmin

export default webUserRouter;


//middleware
// they are function
// which has req,res,next

//admin => user reader
//superAdmin => user read ,delete user
//customer => does not have permission to read user