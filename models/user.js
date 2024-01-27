 const mongoose = require ("mongoose");
 const joi = require ("joi");
 const jwt = require("jsonwebtoken")



 const UserSchema = mongoose.Schema({
     email :{ 
         type : String , 
         required : true,
         trim :true,
         minlength:5,
         maxlength:100,
        unique : true
     },
     userName :{ 
         type : String , 
         required : true,
         trim :true,
         minlength:2,
         maxlength:100,
         unique : true
     },
      password :{ 
         type : String , 
         required : true,
         trim :true,
         minlength:6,
       
     },
     isAdmin: {
         type : Boolean,
         default : false
      },
     token:{
        type:[{String}],
        default:[]
     }


 } , { timestamps : true })

 UserSchema.methods.generateToken = function(){
    return jwt.sign({id : this._id , isAdmin: this.isAdmin,randomNumber : Math.random()},process.env.JWT_SECRET_KEY ,{expiresIn:"100d"})


 }

 const User = mongoose.model("User" , UserSchema);

//validate register user
function validationRegisterUser(obj){
     const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required(),
        userName: joi.string().trim().min(2).max(100).required(),
        password: joi.string().min(6).required()

     })
     return schema.validate(obj);
 };

 //validate login user
function validationLoginUser(obj){
    const schema= joi.object({
       email:joi.string().trim().min(5).max(100).required(),
       password:joi.string().min(6).required(),
    })
    return schema.validate(obj);
};

 //validate Update user
 function validationUpdateUser(obj){
    const schema=joi.object({
       email:joi.string().trim().min(5).max(100),
       userName:joi.string().trim().min(5).max(100),
       password:joi.string().min(6)

    })
    return schema.validate(obj);
};

 module . exports = {
     User,
     validationRegisterUser,
     validationLoginUser,
     validationUpdateUser
 }
