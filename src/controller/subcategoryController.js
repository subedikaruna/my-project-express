import { Subcategory } from "../schema/model.js";

export let createSubcategoryController = async (req, res, next) => {
  let data = req.body; //{name:"".....}

  try {
    let result = await Subcategory.create(data);
    res.status(200).json({
      success: true,
      message: "Subcategory created successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export let readSubcategoryController = async (req, res, next) => {
  //get subcategory from database
  try {
    let result = await Subcategory.find({});
    res.status(200).json({
      success: true,
      message: "subcategory read successfully",
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

export let readSpecificSubcategoryController = async (req, res, next) => {
  try {
    let result = await Subcategory.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "subcategory read successfully",
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
export let updateSubcategoryController = async (req, res, next) => {
  try {
    let result = await Subcategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "subcategory read successfully",
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
export let deleteSubcategoryController = async (req, res, next) => {
  try {
    let result = await Subcategory.findByIdAndDelete(req.params.id);

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
