import { Product } from "../schema/model.js";



export let createProductController = async (req, res, next) => {
  let data = req.body; //{name:"".....}

  try {
    let result = await Product.create(data);
    res.status(200).json({
      success: true,
      message: "Product created successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export let readProductController = async (req, res, next) => {
  //get product from database
  try {
    let result = await Product.find({});
    res.status(200).json({
      success: true,
      message: "product read successfully",
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

export let readSpecificProductController = async (req, res, next) => {
  try {
    let result = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "product read successfully",
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
export let updateProductController = async (req, res, next) => {
  try {
    let result = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "product read successfully",
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
export let deleteProductController = async (req, res, next) => {
  try {
    let result = await Product.findByIdAndDelete(req.params.id);

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
