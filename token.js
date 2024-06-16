import jwt from "jsonwebtoken"
//generate token
// let infoObj={
//     id:"1234"

// }
// let secretKey="dw13"
// let expiryInfo={
//     expiresIn:"365d"
// }
// //expiryInfo must be in same format
// let token=jwt.sign(infoObj,secretKey,expiryInfo)
// console.log(token)

//verify token
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJpYXQiOjE3MTE2Mjg1OTgsImV4cCI6MTc0MzE2NDU5OH0.I0rZZYAev8TJ9jYz22iHBXMIoMOP4borVM0dipl2IwY"
try {
 
let infoObj=await jwt.verify(token,"shoes")//shoes is secretKey
//for a verified token 
//a token must be made from given secretKey
//it shouldnot exceed expiryInfo
console.log(infoObj)   
} catch (error) {
    console.log(error.message)
}

//npm i webtoken