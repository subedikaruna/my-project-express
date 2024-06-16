import { Schema } from "mongoose";

let categorySchema=Schema({
    categoryName:{
        type: String,
        required: [true, "caImage field is required"],
    },
    categoryParent:{
        type:String,
    },
    categoryStatus:{
        type: String,
        required: [true, "categoryStatus field is required"],
    },
    categoryImage:{
        type: String,
        required: [true, "categoryImage field is required"],
    },
    categoryUrl:{
        type: String,
        required: [true, "categoryUrl field is required"],
    },
})
export default categorySchema