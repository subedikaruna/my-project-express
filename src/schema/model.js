import { model } from "mongoose";
import categorySchema from "./categorySchema.js";
import subcategorySchema from "./subcategorySchema.js";
import imageSchema from "./imageSchema.js";
import productSchema from "./productSchema.js";
import productdetailSchema from "./prouctdetailSchema.js";
import webUserSchema from "./webUserSchema.js";

export let Category = model("Category", categorySchema);
export let Subcategory = model("Subcategory", subcategorySchema);
export let Image = model("Image", imageSchema);
export let Product = model("Product", productSchema);
export let Productdetail = model("Productdetail", productdetailSchema);
export let WebUser=model("WebUser",webUserSchema)