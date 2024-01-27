


const notFound= (req,res,next) => {
    const error= new Error(`Not found =>  ${req.originalUrl}`)
    res.status(404)
    next(error)

}
//error handler middle were

const errorHandler = (err,req,res) => {

    const statusCode =res.statusCode === 200 ? 500 :res.statusCode;
    res.status (statusCode).json({message:err.message})
}

module.exports = {
    notFound ,
    errorHandler
}
