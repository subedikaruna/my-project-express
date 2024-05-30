import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  readCategoryController,
  readSpecificCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

let categoryRouter = Router();
categoryRouter
  .route("/")
  .post(createCategoryController)

  .get(readCategoryController);

categoryRouter
  .route("/:id")
  .get(readSpecificCategoryController)
  .patch(updateCategoryController)
  .delete(deleteCategoryController);

export default categoryRouter;
