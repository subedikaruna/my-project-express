import jwt from "jsonwebtoken";
import { secretKey } from "./src/validation/constant.js";
import expressAsyncHandler from "express-async-handler";
export let generateToken = expressAsyncHandler(
  async (infoObj, secretKey, expiryInfo) => {
    let token = await jwt.sign(infoObj, secretKey, expiryInfo);
    return token;
  }
);
export let verifyToken = expressAsyncHandler(async (token, secretKey) => {
  let infoObj = await jwt.verify(token, secretKey);
  return infoObj;
});

//generate token
// let infoObj={
//     id:"1234",
//     role:"admin"

// }
// let secretKey="shoes"
// let expiryInfo={
//     expiresIn:"365d"
// }
// // //expiryInfo must be in same format
// let token= await jwt.sign(infoObj,secretKey,expiryInfo)
// console.log(token)

//verify token
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTg1NTcxMTIsImV4cCI6MTc1MDA5MzExMn0.dcyX4GXZzzK5Y7SpCjH1lat1vAhsWlazrhCKcU2NdJw";
try {
  let infoObj = await jwt.verify(token, "shoes"); //shoes is secretKey
  //   //for a verified token
  //   //a token must be made from given secretKey
  //   //it shouldnot exceed expiryInfo
  console.log(infoObj);
} catch (error) {
  console.log(error.message);
}

//npm i webtoken
