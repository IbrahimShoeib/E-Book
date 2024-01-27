const express =require("express")
const router =express.Router()
const getForgetPasswordView = require("../controler/passwordControler")


//password/forget-password
router.route("/forget-password")
.get(getForgetPasswordView)





module.exports = router