const express=require('express')
const authController=require('./../controllers/auth_controller')
const router=express.Router()

router.post('/signUp',authController.userSignup)
router.post('/login',authController.userLogin)

module.exports=router;