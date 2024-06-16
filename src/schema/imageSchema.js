import { Schema } from "mongoose";

let imageSchema = Schema({
  imageName: {
    type: String,
    required: [true, "productName field is required"],
  },
  productId: {
    type: Schema.ObjectId,
    ref: "Product",
  },
  imagePath: {
    type: String,
    required: [true, "ImagePath field is required"],
  },
});
export default imageSchema;
