const { ticketService } = require("../../service/ticket")
const { getAllSchedule, getTicketBySchedule, searchScheduleMulti, getAllAirport } = ticketService



module.exports = class ticketController {
    static async getAllSchedule(req, res) {
        const schedule = await getAllSchedule()
        if (schedule.lenght == 0) {
            return res.status(400).json({
                status: false,
                message: "No Schedules"
            })
        } else {
            res.status(200).json({
                schedule
            })
        }
    }


    static async getTicketBySchedule(req, res) {
        const id = req.params.id
        const ticket = await getTicketBySchedule(id)
        if (ticket.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'no ticket'
            })
        } else {
            return res.status(200).json({
                ticket
            })
        }
    }

    static async searchScheduleMulti(req, res) {
        // console.log('value'), departureDate;
        const schedule = await searchScheduleMulti(req.query)
        if (Array.isArray(schedule) && schedule.length > 0) {
            return res.status(200).json({
                schedule
            })
        } else {
            return res.status(400).json({
                status: false,
                message: 'no schedule',
            })
        }
    }

    static async getAllAirport(req, res) {
        const airport = await getAllAirport()
        if (Array.isArray(airport) && airport.length > 0) {
            return res.status(200).json({
                message: "All Data Airport",
                airport: airport
            })
        }
    }
}