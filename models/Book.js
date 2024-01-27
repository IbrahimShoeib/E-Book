const mongoose = require ("mongoose");
//export joi 
const joi=require("joi");

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        minlength:3,
        maxlength:10
    },weight:{
        type:String,
        trim:true,
        require:true,
        minlength:1,
        maxlength:5
    },date:{
        type:String,
        trim:true,
        require:true,
        minlength:3,
        maxlength:10
    } 
})


const Book = mongoose.model("Book",bookSchema);

function validatecreateBook(obj){
    const schema = joi.object({
        name:joi.string().min(3).max(10),
        weight:joi.string().min(1).max(5),
        date:joi.number()
    });
    return schema.validate(obj);
};

function updatebookvalidation(obj){
    const Schema = joi.object({
         name:joi.string().min(3).max(10),
         weight:joi.string().min(1).max(5),
         date:joi.number()
    });
    return Schema.validate(obj);
 }
module.exports={
    Book,
    validatecreateBook,
    updatebookvalidation
}