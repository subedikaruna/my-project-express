import jwt from "jsonwebtoken";
import { secretKey } from "./src/validation/constant.js";
import expressAsyncHandler from "express-async-handler";

// Function to generate a JWT token
export const generateToken = expressAsyncHandler(async (infoObj, expiryInfo) => {
  const token = await jwt.sign(infoObj, secretKey, expiryInfo);
  return token;
});

// Function to verify a JWT token
export const verifyToken = expressAsyncHandler(async (token) => {
  const infoObj = await jwt.verify(token, secretKey);
  return infoObj;
});

// Example usage to generate a token
const infoObj = {
  id: "1234",
  role: "admin"
};
const expiryInfo = {
  expiresIn: "365d"
};

// Generate token
generateToken(infoObj, expiryInfo)
  .then((token) => {
    console.log("Generated Token:", token);
  })
  .catch((error) => {
    console.error("Error generating token:", error.message);
  });

// Example token for verification
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTg1NTcxMTIsImV4cCI6MTc1MDA5MzExMn0.dcyX4GXZzzK5Y7SpCjH1lat1vAhsWlazrhCKcU2NdJw";

// Verify token
verifyToken(token)
  .then((infoObj) => {
    console.log("Verified Token Info:", infoObj);
  })
  .catch((error) => {
    console.error("Error verifying token:", error.message);
  });
