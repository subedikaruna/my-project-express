import { Productdetail } from "../schema/model.js";


export let createProductdetailController = async (req, res, next) => {
  let data = req.body; //{name:"".....}

  try {
    let result = await Productdetail.create(data);
    res.status(200).json({
      success: true,
      message: "Productdetail created successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export let readProductdetailController = async (req, res, next) => {
  //get productdetail from database
  try {
    let result = await Productdetail.find({});
    res.status(200).json({
      success: true,
      message: "productdetail read successfully",
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

export let readSpecificProductdetailController = async (req, res, next) => {
  try {
    let result = await Productdetail.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "productdetail read successfully",
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
export let updateProductdetailController = async (req, res, next) => {
  try {
    let result = await Productdetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "productdetail read successfully",
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
export let deleteProductdetailController = async (req, res, next) => {
  try {
    let result = await Productdetail.findByIdAndDelete(req.params.id);

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
