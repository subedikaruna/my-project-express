import Joi from "joi"
//.string()
//value must be string
//it should not be empty
//.min(3)=>the field must have at least 3 character
//.max(10)=>the field must have at most 10 character
//doesnot allow "" but can allow if you only let .allow("")
//.number()
//value must be number(it doesnot look type for number)
//it means "21"and 21 are same
//.min()
//.max()

//.boolean()
//value must be boolean
 //required=>any (string,number,boolean)
 //you must pass field

 //enum=>fixed value(malefemale,others)
 //.valid("male","female","others")
 //throw custom error
 //object
 //Joi.object().keys({
//  ..
 // })

 //array
 //Joi.array().items()

let randomValidation=Joi.object()
.keys({
    name:Joi.string().required().min(3).max(10).messages({
        "any.required":"name is required",
        "string.base":"field must be string",
        "string.min":"name must be at least 3 characters"
    }).allow(""),
    age:Joi.number().required()
    //.min(12)
    //.max(60),
    .custom((value,msg)=>{
   if (value>=18){
    return true
   }else{
    return msg.message("age must be at least 18")
   }
    }),
    isMarried:Joi.boolean().required(),
    gender:Joi.string().required().valid("male","female","others").messages({
        "any.required":"gender is required",
        "any.only":"gender must be either male,female or others",
    }),
    spouseName:Joi.when("isMarried",{
        is:true,
        then:Joi.string().required(),
        otherwise:Joi.string()
    }),
email:Joi.string().required()
.custom((value,msg)=>{
let validEmail=value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
 if(validEmail) {
    return true
    }
    else{
        return msg.message("email is not valid")
    }
    }),
    password:Joi.string().required()
    .custom((value,msg)=>{
    let validPassword=value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)
     if(validPassword) {
        return true
        }
        else{
            return msg.message("password must have at least one uppercase,one lowercase,one symbol,one number,min 8 character and max 15 character")
        }
     }),
      phoneNumber:Joi.number().required(),
   age:Joi.number().required(),
     dob:Joi.date(),
       location:Joi.object().keys({
        country:Joi.string().required(),
        exactLocation:Joi.string().required()
       }),
       favTeacher:Joi.array().items(Joi.string().required()),
       favSubject:Joi.array().items(Joi.object().keys({
        bookName:Joi.string().required(),
        bookAuthor:Joi.string().required()
       }))
    }).unknown(true)
    export default randomValidation