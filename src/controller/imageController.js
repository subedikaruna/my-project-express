import { Image } from "../schema/model.js";

export let createImageController = async (req, res, next) => {
  let data = req.body; //{name:"".....}

  try {
    let result = await Image.create(data);
    res.status(200).json({
      success: true,
      message: "Image created successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export let readImageController = async (req, res, next) => {
  //get image from database
  try {
    let result = await Image.find({}).populate("productId", "productName");
    res.status(200).json({
      success: true,
      message: "image read successfully",
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

export let readSpecificImageController = async (req, res, next) => {
  try {
    let result = await Image.findById(req.params.id).populate("productId", "productName");;
    res.status(200).json({
      success: true,
      message: "image read successfully",
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
export let updateImageController = async (req, res, next) => {
  try {
    let result = await Image.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "image read successfully",
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
export let deleteImageController = async (req, res, next) => {
  try {
    let result = await Image.findByIdAndDelete(req.params.id);

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
