import { secretKey } from "../validation/constant.js";
import jwt from "jsonwebtoken";

let isAuthenticated = async (req, res, next)=>{
  
    try{
      //get token from postman
      let tokenString = req.headers.authorization;
      let tokenArray = tokenString.split(" ");
      let token =  tokenArray[1];
      let user = await jwt.verify(token, secretKey);
      console.log(user);
      req._id = user._id;
      next();
    }
    catch(error){
      res.json({
        success: false,
        message: "Token not valid"
      })
    }
  
  }

  export default isAuthenticated;