import { Schema } from "mongoose";

let productdetailSchema=Schema({
   productId:{
        type: Number,
        required: [true, "productName field is required"],
    },
    productFeature:{
        type:String,
        required: [true, "productFeature field is required"],
    },
    productDescription:{
        type:String,
        required: [true, "productName field is required"],
    },
  
})
export default productdetailSchema