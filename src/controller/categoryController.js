import { Category } from "../schema/model.js";

export let createCategoryController = async (req, res, next) => {
  let data = req.body; //{name:"".....}
  
  try {
    let result = await Category.create(data);
    res.status(200).json({
      success: true,
      message: "Category created successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export let readCategoryController = async (req, res, next) => {
  //get category from database
  try {
    let result = await Category.find({});
    res.status(200).json({
      success: true,
      message: "category read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  //give data to postman
};

export let readSpecificCategoryController = async (req, res, next) => {
  try {
    let result = await Category.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "category read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  //give data to postman
};
export let updateCategoryController = async (req, res, next) => {
  try {
    let result = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "category read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  //give data to postman
};
export let deleteCategoryController = async (req, res, next) => {
  try {
    let result = await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  //give data to postman
};
