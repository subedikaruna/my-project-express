import { Schema } from "mongoose";

let productSchema = Schema({
  productName: {
    type: String,

    required: [true, "productName field is required"],
  },
  categoryId: {
  
    type: Schema.ObjectId,
    ref: "Category",
  },
  subcategoryId: {

    type: Schema.ObjectId,
    ref: "Subcategory",
  },
  featureImage: {
    type: String,
  },
  productStatus: {
    type: String,
    required: [true, "productStatus field is required"],
  },
  displayPrice: {
    type: Number,
    required: [true, "displayPrice field is required"],
  },
  actualPrice: {
    type: Number,
    required: [true, "actualPrice field is required"],
  },
  shortDescription: {
    type: String,
    required: [true, "shortDescription field is required"],
  },
});
export default productSchema;
