const { Router } = require("express")
const router = Router()
const { ticketController } = require("../controller/ticket")


router.get("/schedule", ticketController.getAllSchedule)
router.get("/schedule/:id/ticket", ticketController.getTicketBySchedule)
router.get("/schedule/search", ticketController.searchScheduleMulti)
router.get("/schedule/airport", ticketController.getAllAirport)
router.get("/schedule/arrive-date-begin", ticketController.getScheduleSortArriveBegin)
router.get("/schedule/arrive-date-end", ticketController.getScheduleSortArriveEnd)
router.get("/schedule/departure-date-begin", ticketController.getScheduleSortDeptBegin)
router.get("/schedule/departure-date-end", ticketController.getScheduleSortDeptEnd)
router.get("/schedule/favorite", ticketController.getScheduleFavorite)
// router.get("/schedule/shortest", ticketController.getScheduleShortest) still bug


module.exports = router