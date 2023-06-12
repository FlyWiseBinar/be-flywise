const { Router } = require("express")
const router = Router()

const { whoAmIController } = require("../controller/auth")
const { checkoutController } = require("../controller/order")

const { authMiddleware } = require("../middleware")

router.get("/auth/whoami", authMiddleware, whoAmIController.whoAmI)

router.get("/order/schedule-detail", authMiddleware, checkoutController.scheduleDetail)
router.post("/order/create-order", authMiddleware, checkoutController.makeOrder)

module.exports = router
