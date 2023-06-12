const { Router } = require("express")
const router = Router()

const { guestMiddleware, activeUserMiddleware, authMiddleware } = require("../middleware")
const { loginController, resetPasswordController, profileController } = require("../controller/auth")
const { loginValidation, resetPasswordValidation, updateProfileValidation, handleValidation } = require("../validation")

router.post("/auth/login", guestMiddleware, loginValidation, handleValidation, activeUserMiddleware, loginController.login)
router.post("/auth/reset-password/send-otp", guestMiddleware, activeUserMiddleware, resetPasswordController.sendOtp)
router.post("/auth/reset-password/resend-otp", guestMiddleware, activeUserMiddleware, resetPasswordController.resendOtp)
router.post("/auth/reset-password/verify-otp", guestMiddleware, activeUserMiddleware, resetPasswordController.verifyOtp)
router.put("/auth/reset-password/reset", guestMiddleware, activeUserMiddleware, resetPasswordValidation, handleValidation, resetPasswordController.reset)

router.put("/auth/profile", authMiddleware, updateProfileValidation, handleValidation, profileController.update)



module.exports = router