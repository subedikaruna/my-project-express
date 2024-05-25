import { Router } from "express";
import {
  createImageController,
  deleteImageController,
  readImageController,
  readSpecificImageController,
  updateImageController,
} from "../controller/imageController.js";

let imageRouter = Router();
imageRouter.route("/").post(createImageController).get(readImageController);

imageRouter
  .route("/:id")
  .get(readSpecificImageController)
  .patch(updateImageController)
  .delete(deleteImageController);

export default imageRouter;
