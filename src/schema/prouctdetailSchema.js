import { Schema } from "mongoose";

let productdetailSchema = Schema({
  productId: {
    type: Schema.ObjectId,
    ref: "Product",
  },
  productFeature: {
    type: String,
    required: [true, "productFeature field is required"],
  },
  productDescription: {
    type: String,
    required: [true, "productDescription field is required"],
  },
});
export default productdetailSchema;
