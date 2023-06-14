const { Router } = require("express")
const router = Router()

const { ticketController } = require("../controller/ticket")

router.post("/ticket", ticketController)

module.exports = router