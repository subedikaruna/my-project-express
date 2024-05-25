import { Router } from "express";
import {
  handleMultipleFileController,
  handleSingleFileController,
} from "../controller/fileController.js";
import upload from "../utils/uploadFile.js";

const fileRouter = Router();

fileRouter
  .route("/single") //localhost:8001/files/single
  .post(upload.single("document"), handleSingleFileController); //req.file,req.body

fileRouter
  .route("/multiple") //localhost:8001/files/multiple
  .post(upload.array("document"), handleMultipleFileController); //req.files,req.body

export default fileRouter;
