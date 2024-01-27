//express init 
const express=require("express");
const {verifytokenAndAdmin} = require("../middleware/verifytoken")
const router=express.Router();
 const autherControler = require('../../bstore/controler/autherControler');
const { required } = require("joi");

 //*****************************sTARTING cODE ************************************

 //api/authers
 router.route("/")
    .get(autherControler.getAllAuthers)
    .post(verifytokenAndAdmin,autherControler.addNewAther)
    .put(verifytokenAndAdmin,autherControler.updateNewAther)
    .delete(verifytokenAndAdmin,autherControler.deleteAuther)


//api/authers/:id
router.route("/:id")
    .get(autherControler.getAutherById)
    .post(verifytokenAndAdmin,autherControler.addNewAther)
    .put(verifytokenAndAdmin,autherControler.updateNewAther)
    .delete(verifytokenAndAdmin,autherControler.deleteAuther)


module.exports=router