import { Schema } from "mongoose";

let subcategorySchema=Schema({
    subcategoryName:{
        type: String,
        required: [true, "subcategoryName field is required"],
    },
  
    subcategoryStatus:{
        type: String,
        required: [true, "subcategoryStatus field is required"],
    },
    subcategoryImage:{
        type: String,
        required: [true, "subcategoryImage field is required"],
    },
    subcategoryUrl:{
        type: String,
        required: [true, "subcategoryUrl field is required"],
    },
    subcategoryId:{
        type: Number,
        required: [true, "subcategoryId field is required"],
    },
})
export default subcategorySchema