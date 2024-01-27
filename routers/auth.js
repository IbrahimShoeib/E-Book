const express =require("express");
const router=express.Router();
const bcrypt=require("bcryptjs")
const asynchandler = require ("express-async-handler")
const { User,validationRegisterUser,validationLoginUser,validationUpdateUser}=require ("../models/user");
const { updateAuthers } = require("../models/Auther");



/***
 * @desc Resgistter New User
 * @route api/auth/register
 * @method Post
 * @access public 
 */
router.post(("/register"), asynchandler(async( req , res ) => {
    const {error} = validationRegisterUser(req.body);
    if (error){
        res.status(400).json({message : error.details[0].message})
    }

    let user =await User.findOne({email:req.body.email})
    if(user){
        res.status(400).json({message :" This User is already registered"})
    }

    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt)

     user = new User({
        email: req.body.email,
        userName : req.body.userName,
        password : req.body.password,
        isAdmin : req.body.isAdmin
    })
    
    const result = await user.save()
    const token = user.generateToken()
     result.token.push(token)
    result.save()

    const{password,...other} = result._doc

    res.status(200).json({...other,token});
}));

/***
 * @desc login user 
 * @rouer api/auth/login
 * @method post
 * @access public
 */

router.post(("/login"), asynchandler(async( req , res ) => {
    const {error} = validationLoginUser(req.body);
    if (error){
        res.status(400).json({message : error.details[0].message})
    }
 
    let user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(400).json({message :" invalied email"})
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password  , user.password)

    if(!isPasswordMatch){
        res.status(400).json({message :" invalied password"})
    }

    const token = user.generateToken()
     const {password,...other} = user._doc

    //  user.token.push(token)
     user.save()

     res.status(200).json({token,...other})
}));

module.exports = router