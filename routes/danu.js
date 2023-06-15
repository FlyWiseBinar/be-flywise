const { Router } = require("express")
const router = Router()

const { ticketController } = require("../controller/ticket")

router.get("/schedule", ticketController.getAllSchedule)
router.get("/schedule/:id/ticket", ticketController.getTicketBySchedule)

module.exports = router