import express, { json } from "express";
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import cors from "cors";

import categoryRouter from "./src/router/categoryRouter.js";
import connectToMongoDb from "./src/connectdb/connectToMongodb.js";
import subcategoryRouter from "./src/router/subcategoryRouter.js";
import productRouter from "./src/router/productRouter.js";
import productdetailRouter from "./src/router/productdetailRouter.js";
import imageRouter from "./src/router/imageRouter.js";
import fileRouter from "./src/router/fileRouter.js";
import webUserRouter from "./src/router/webUserRouter.js";


let expressApp = express();
expressApp.use(express.static("./public"));
expressApp.use(cors());
expressApp.use(json());
expressApp.use("/categorys", categoryRouter);
expressApp.use("/subcategorys", subcategoryRouter);
expressApp.use("/products", productRouter);
expressApp.use("/productdetails", productdetailRouter);
expressApp.use("/images", imageRouter);
expressApp.use("/files", fileRouter);
 expressApp.use("/web-users",webUserRouter);
connectToMongoDb();
expressApp.listen(8001, () => {
  console.log("express application is listening at port 8001");
});
