import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  readProductController,
  readSpecificProductController,
  updateProductController,
} from "../controller/productController.js";

let productRouter = Router();
productRouter
  .route("/")
  .post(createProductController)
  .get(readProductController);

productRouter
  .route("/:id")
  .get(readSpecificProductController)
  .patch(updateProductController)
  .delete(deleteProductController);

export default productRouter;
