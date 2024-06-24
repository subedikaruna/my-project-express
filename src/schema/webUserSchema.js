import { Schema } from "mongoose";

// let webUserSchema = new Schema({
    // when new is removed the webuser is blue but when it removed it is blue ?????????????????
let webUserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "fullName feild is required"]
    },
    email: {
        type: String,
        required: [true, "email feild is required"]
    },
    password: {
        type: String,
        required: [true, "password feild is required"]
        
    },
    dob: {
        type: Date,
        required: [true, "dob feild is required"]
        
    },
    gender: {
        type: String,
        required: [true, "gender feild is required"]
    },
    role: {
        type: String,
        required: [true, "role feild is required"]
    },
    isVerifiedEmail: {
        type: Boolean,
        required: [true, "isVerifiedemail feild is required"]
    },

},{timestamps: true});

export default webUserSchema;