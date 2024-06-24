import { Router } from "express";
import webUserValidation from "../middleware/webUserValidation.js"


import validation from "../middleware/validation.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { WebUser } from "../schema/model.js";
import authorized from "../middleware/authorized.js";
import { createWebUserController, deleteSpecificWebUser, forgotPassword, loginUser, myProfile, readAllUser, readSpecificWebUser, resetPassword, updatePassword, updateProfile, updateSpecificWebUser, verifyEmail } from "../controller/WebUserController.js";

let webUserRouter = Router();


webUserRouter
.route("/")
.post(validation(webUserValidation),createWebUserController)
// .get(readWebUserController)
.get(isAuthenticated,authorized(["admin","superadmin"]) ,readAllUser)

webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/login").post(loginUser);

webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);

webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);

webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);

webUserRouter.route("/forgot-password").post(forgotPassword);

webUserRouter.route("/reset-password").patch(isAuthenticated, resetPassword);


webUserRouter.route("/:id")
.get(isAuthenticated, authorized(["admin", "superadmin"]), readSpecificWebUser)  //admin, superadmin
.patch(isAuthenticated, authorized(["admin","superadmin"]), updateSpecificWebUser) // admin, superadmin
.delete(isAuthenticated, authorized(["superadmin"]), deleteSpecificWebUser); //superadmin


// webUserRouter
//   .route("/:id")
//   .get(readSpecificWebUserController)
//   .patch(updateWebUserController)
//   .delete(deleteWebUserController);


export default webUserRouter;