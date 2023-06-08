const {Router} = require("express")
const router = Router()

const {guestMiddleware, activeUserMiddleware} = require("../middleware")
const {loginController, resetPasswordController} = require("../controller/auth")
const {loginValidation, resetPasswordValidation, handleValidation} = require("../validation")

router.post("/auth/login", loginValidation, handleValidation, activeUserMiddleware, loginController.login)
router.post("/auth/reset-password/send-otp", activeUserMiddleware, resetPasswordController.sendOtp)
router.post("/auth/reset-password/resend-otp", activeUserMiddleware, resetPasswordController.resendOtp)
router.post("/auth/reset-password/verify-otp", activeUserMiddleware, resetPasswordController.verifyOtp)
router.put("/auth/reset-password/reset", activeUserMiddleware, resetPasswordValidation, handleValidation, resetPasswordController.reset)

module.exports = router