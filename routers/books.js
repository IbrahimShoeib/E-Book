const express = require("express");
const joi = require("joi")
const router=express.Router();
const { validatecreateBook,updatebookvalidation}= require ("../models/Book")
const { verifytokenAndAdmin} =require ( "../middleware/verifytoken")
const bookControler =require("../../bstore//controler/bookControler")
//*****************************sTARTING cODE ************************************


//api/books
router.route ("/",validatecreateBook,updatebookvalidation)
    .get(bookControler.getAllBooks)
    .post(verifytokenAndAdmin,bookControler.AddNewBooks);

//api/books/:id
router.route ("/:id",updatebookvalidation)

    .get(bookControler.getAllBooksById)
    .put(verifytokenAndAdmin, bookControler.updateNewBooks)
.   delete(verifytokenAndAdmin,bookControler.deleteBookById)


module.exports=router;