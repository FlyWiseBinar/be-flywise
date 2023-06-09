const {Router} = require("express")
const router = Router()

const {registerValidation, handleValidation} = require("../validation")
const {registerController} = require("../controller/auth")

router.post("/auth/register", registerValidation, handleValidation, registerController.register)
router.post("/auth/send-otp", registerController.otpSend)
router.post("/auth/verify-otp", registerController.otpVerify)
router.post("/auth/resend-otp", registerController.otpResend)

module.exports = router
