const { Router } = require("express")
const router = Router()

const { ticketController } = require("../controller/ticket")

router.get("/ticket", ticketController)

module.exports = router