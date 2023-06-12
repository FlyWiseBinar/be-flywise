const { Router } = require("express")
const router = Router()

const { whoAmIController } = require("../controller/auth")
const { checkoutController } = require("../controller/order")

const { authMiddleware } = require("../middleware")

router.get("/auth/whoami", authMiddleware, whoAmIController.whoAmI)

router.post("/order/checkout", authMiddleware, checkoutController.makeOrder)

module.exports = router
