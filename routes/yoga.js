const { Router } = require("express")
const router = Router()

const { registerValidation, handleValidation } = require("../validation")
const { registerController } = require("../controller/auth")
const { authMiddleware } = require("../middleware")
const { historyController } = require("../controller/order")

router.post("/auth/register", registerValidation, handleValidation, registerController.register)
router.post("/auth/send-otp", registerController.otpSend)
router.post("/auth/verify-otp", registerController.otpVerify)
router.post("/auth/resend-otp", registerController.otpResend)
router.get("/order/history", authMiddleware, historyController.getAllHistoryOrders)

module.exports = router
