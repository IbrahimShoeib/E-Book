const AsyncHandler = require("express-async-handler")



/***
 * @desc get forget password View
 * @route /password
 * @method get
 * @access public
 */

const getForgetPasswordView=AsyncHandler((req,res)=>{
    res.render("forget-password")
})


module.exports =  getForgetPasswordView
