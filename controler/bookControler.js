const mongoose = require("mongoose");
const asynchandler= require("express-async-handler")
const {Book , validatecreateBook,updatebookvalidation}= require ("../models/Book")


//*****************************sTARTING cODE ************************************

/***
 * @desc get all book
 * @router api/books/:id
 * @method Get
 * @access public
 */
const getAllBooks = asynchandler(async(req,res)=>{

    //comparation Query Operators
    //@eg (eqaul) => تساوي
    //$ne (not eqaual)
    //$lt (less than)
    //$lte (less than and equal)
    //$greater (than and equal)
    //$in [nim1,num2] a book in range ( , )
    //$nin [nim1,num2] a book in range ( , ) withoue num1,num2
    //==>> const book= await Book.find( {price:{$lth:10}});
    // const {maxweight,minweight} = req.query
    const book= await Book.find();

    res.status(200).json(book);

})

/***
 * @desc get books by id
 * @router api/books/:id
 * @method Get
 * @access public
 */

const getAllBooksById = asynchandler(async(req,res)=>{

    const book=await Book.findById(req.params.id);
    if(book){
        res.status(200).json(book);


    }else{
        res.status(404).json({message:"book is not found"});
    }


 })
 /***
 * @desc new book
 * @router api/books
 * @method post
 * @access private (Only Admin)
 */

//  verifytokenAndAdmin,
 const AddNewBooks = asynchandler(async(req,res) =>{

    const {error} =validatecreateBook(req.body)
    if (error){
        return res.status(400).json({message: error.details[0].message})
    }
    
try{
    const books= new Book ({
        
         name: req.body.name,
         weight: req.body.weight,
         date: req.body.date

    })
    const result=await books.save()

    res.status(201).json(result)
} catch(error){
    console.log("this is an error",error)
    res.status(500).json({message:" that wasnot found"})
}
})
/***
 * @desc update books by id
 * @router api/books/:id
 * @method put
 * @access private (Only Admin)
 */
// verifytokenAndAdmin,
const updateNewBooks = asynchandler(async(req,res) => {
    const {error}=updatebookvalidation(req.body)

    if(error){
        res.status(400).json({message:"id is not found "})
    }
     const updateBook=await Book.findByIdAndUpdate(req.params.id,{
            $set:{
                 name: req.body.name,
                 weight: req.body.weight,
                date: req.body.date
            }},{
                new:true
            })

    res.status(200).json(updateBook)
})

/***
 * @desc delete books by id
 * @router api/books/:id
 * @method delete
 * @access private (Only Admin)
 */

// verifytokenAndAdmin
 const deleteBookById = async(req,res) => {

    const book=await Book.findById(req.params.id)
    if(book){
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"book has been deleted"})
    }
    else{
        res.status(404).json({message:"book not found "})
    }


}


module.exports = {
    getAllBooks, 
    AddNewBooks,
    getAllBooksById,
    updateNewBooks,
    deleteBookById
}