const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asynchandler = require ("express-async-handler");
const {User, validationUpdateUser } = require("../models/user");
const { verifytokenAndAdmin,verifytokenAndAuthorization} = require("../middleware/verifytoken");



//*****************************sTARTING cODE ************************************

/***
 * @desc update User
 * @route api/auth/update
 * @method PUT
 * @access private
 */

router.put("/:id",verifytokenAndAuthorization,asynchandler(async(req,res) => {

    if(req.user.id != req.params.id){
        return res.status(201).json({message:`you are can't edit profile`})
    }

    const {error} = validationUpdateUser(req.body);

    if(error){

        return res.status(400).json({
                            status_code:-1,
                            message : error.details[0].message,
                            data:null
                        })
             }

    if(req.body.password){

          const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password ,salt);

            }

    const updateduser = await User.findByIdAndUpdate(req.params.id ,{
        $set:{
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password
        }

    },{new:true});

             res.status(200).json(updateduser);


    })
    
  


 )

 /***
  * @desc Get All User
  * @route api/user
  * @method Get
  * @access private (only Admin)
  */

 router.get("/",verifytokenAndAdmin,async(req,res) => {
    const users = await User .find().select("-password")
    res.status(200).json(users)



 })
 
 router.delete("/:id" ,verifytokenAndAuthorization,asynchandler(async(req,res) => {
    const user = await User.findByIdAndDelete(req.params.id).select("-password");

    if(user){
        res.status(200).json({message:"this user is deleted"})
    }else{
        res.status(404).json({message:"this user is not found "})
    }



 }))

 module.exports = router
