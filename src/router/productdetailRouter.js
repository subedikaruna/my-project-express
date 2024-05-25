import { Router } from "express";
import {
  createProductdetailController,
  deleteProductdetailController,
  readProductdetailController,
  readSpecificProductdetailController,
  updateProductdetailController,
} from "../controller/productdetailController.js";

let productdetailRouter = Router();
productdetailRouter
  .route("/")
  .post(createProductdetailController)
  .get(readProductdetailController);

productdetailRouter
  .route("/:id")
  .get(readSpecificProductdetailController)
  .patch(updateProductdetailController)
  .delete(deleteProductdetailController);

export default productdetailRouter;
