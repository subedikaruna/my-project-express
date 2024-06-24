import Joi from 'joi';

const webUserValidation = Joi.object({
    fullName: Joi.string()
        .required()
        .messages({
            "any.required": "Full Name is required"
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "any.required": "Email is required",
            "string.email": "Invalid Email"
        }),
    password: Joi.string()
        .required()
        .messages({
            "any.required": "Password is required"
        }),
    dob: Joi.date()
        .required()
        .messages({
            "any.required": "Date of Birth is required"
        }),
    gender: Joi.string()
        .required()
        .valid('male', 'female', 'other')
        .messages({
            "any.required": "Gender is required",
            "any.only": "Gender must be either male, female, or other"
        }),
    role: Joi.string()
        .required()
        .messages({
            "any.required": "Role is required"
        }),
    isVerifiedEmail: Joi.boolean()
        .required()
        .messages({
            "any.required": "Email Verification status is required"
        })
});

export default webUserValidation;