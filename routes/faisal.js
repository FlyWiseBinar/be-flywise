const { Router } = require("express")
const router = Router()

const { whoAmIController } = require("../controller/auth")
const { checkoutController,paymentController } = require("../controller/order")

const { authMiddleware } = require("../middleware")

router.get("/auth/whoami", authMiddleware, whoAmIController.whoAmI)
router.delete("/auth/delete-account", whoAmIController.delete)

router.post("/order/checkout", authMiddleware, checkoutController.makeOrder)

router.post("/order/payment", authMiddleware, paymentController.createPayment)
router.post("/order/send-payment-invoice", authMiddleware, paymentController.getPaymentInvoice)
router.get("/order/pay-payment", paymentController.confirmPayment)
router.put("/order/cancel-payment", authMiddleware, paymentController.cancelPayment)

module.exports = router
