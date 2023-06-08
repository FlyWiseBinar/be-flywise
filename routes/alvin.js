const {Router} = require("express")
const router = Router()

const {guestMiddleware, activeUserMiddleware} = require('../middleware')
const {loginController, resetPasswordController} = require('../controller/auth')
const {loginValidation, resetPasswordValidation, handleValidation} = require('../validation')

router.post('auth/login', guestMiddleware, loginValidation, handleValidation, activeUserMiddleware, loginController.login)
router.post('auth/reset-password/send-otp', guestMiddleware, resetPasswordController.sendOtp)
router.post('auth/reset-password/resend-otp', guestMiddleware, resetPasswordController.resendOtp)
router.post('auth/reset-password/verify-otp', guestMiddleware, resetPasswordController.verifyOtp)
router.post('auth/reset-password/reset', guestMiddleware, resetPasswordValidation, resetPasswordController.reset)