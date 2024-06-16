//Password@123=>$2b$10$4u/SLa4R2hmuFWAJtWGHy.qiea/fvB1c.7exixX.umS3WLRa2Xfzm
//same text or password has different hash code
import bcrypt from "bcrypt"

//************generate hash code */
// let password="Password@123"
// let hashedPassword= await bcrypt.hash(password,10)
// console.log(hashedPassword)

//*********compare hash code */
let loginPassword="Password@123"
let isValidPassword=await bcrypt.compare(
    loginPassword,"$2b$10$4u/SLa4R2hmuFWAJtWGHy.qiea/fvB1c.7exixX.umS3WLRa2Xfzm")
console.log(isValidPassword)