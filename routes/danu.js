const { Router } = require("express")
const router = Router()
const { ticketController } = require("../controller/ticket")

router.get("/schedule/search", ticketController.searchScheduleMulti)
router.get("/schedule/airport", ticketController.getAirportByName)
router.get("/schedule/favorite", ticketController.getScheduleFavorite)
router.get("/schedule/:id", ticketController.findSchedule)

module.exports = router