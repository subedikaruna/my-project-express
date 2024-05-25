import { Router } from "express"
import { createSubcategoryController, deleteSubcategoryController, readSpecificSubcategoryController, readSubcategoryController, updateSubcategoryController } from "../controller/subcategoryController.js"



let subcategoryRouter=Router()
subcategoryRouter
.route("/")
.post(createSubcategoryController)
.get(readSubcategoryController)

subcategoryRouter
.route("/:id")
.get(readSpecificSubcategoryController)
.patch(updateSubcategoryController)
.delete(deleteSubcategoryController)




export default subcategoryRouter