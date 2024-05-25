// import mongoose from "mongoose";
// import { dbUrl } from "../validation/constant.js";

// let connectToMongoDb = () => {
//   mongoose.connect("mongodb://0.0.0.0:27017/dw13");
//   // mongoose.connect(`mongodb+srv://karuna:karuna@cluster0.rhf5vty.mongodb.net/dw13`)
//   //  mongoose.connect(`${dbUrl}`)
// };
// export default connectToMongoDb;


import mongoose from "mongoose";
import { dbURL } from "../validation/constant.js";

let connectToMongoDb = async () => {
  try {
    await mongoose.connect(`${dbURL}`);
    console.log(
      `application is connected to database successfully at port ${dbURL}`
    );
  } catch (error) {
    console.log(error.message);
  }
};
export default connectToMongoDb;
