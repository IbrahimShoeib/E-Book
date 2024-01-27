const {Auther,updateAuthers,createAnewAuthers}=require("../models/Auther")
const asynchandler= require("express-async-handler")

//*****************************sTARTING cODE ************************************

/***
 * @desc get all authers
 * @method get
 * @router /api/authers
 * @access public
 */

const getAllAuthers=asynchandler(
    async(req,res) => { 
    const autherlist=await Auther.find()
    //.sort({lastName : 1}).select("firstName lastName -_id")
    res.status(200).json(autherlist)}


)
/***
 * @desc get Auther by id
 * @router api/authers/:id
 * @method Get
 * @access public
 */
const getAutherById = asynchandler(async(req,res) => {
    const auther=await Auther.findById(req.params.id)

   
       
        
        if(auther){
            res.status(200).json(auther);


        }
        else{
            res.status(404).json({message:"something went wrong"})


        }

    

})

/***
 * @desc to add a new authers
 * @routers /api/authers
 * @method post
 * @access private (only admin)
 */

const addNewAther = asynchandler(async(req,res) => {  
    
    const {error}=createAnewAuthers(req.body);

    if (error){
         return res.status(400).json({
            // status_code: 0,
            message:error.details[0].message,
            // error: error,
            // data : null
        })
    }


 try{
    const auther= new Auther(
        {
        
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            natunality:req.body.natunality,
            age:req.body.age
        })

        const result=await auther.save()
    res.status(200).json(result)
 }

 catch(error){
    console.log(error)
    res.status(500).json("message/that is an error",error)

    
} 
})


/***
 * @desc to update authers
 * @routers /api/authers/:id
 * @method put
 * @access private (Only Admin)
 */
// verifytokenAndAdmin,
const updateNewAther = async(req,res) => {
    const {error}=updateAuthers(req.body)
    if (error){
       return res.status(400).json({message:error.details[0].message})
    }
    try{
        const updateAuther=await Auther.findByIdAndUpdate(req.params.id,
       
       
            { $set:{
                
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                natunality:req.body.natunality,
                age:req.body.age
    
            }},
    
                    {new:true})
       
        res.status(200).json(updateAuther)
    }
    catch(error){
        console.log(error)
        res.status(500).json("message/that is an error",error)
    
        
    }
}

/***
 * @desc delete authers
 * @routers /api/authers/:id
 * @method delete
 * @access private (Only Admin)
 */

const deleteAuther = async(req,res) => {

    const auther=await Auther.findById(req.params.id)
    if(auther){
        await Auther.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"auther has been deleted"})
    }
    else{
        res.status(404).json({message:"auther not found "})
    }




}

module.exports={
    getAllAuthers,
    getAutherById,
    addNewAther,
    updateNewAther,
    deleteAuther

}