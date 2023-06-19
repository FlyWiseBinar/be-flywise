const { ticketService } = require("../../service/ticket")
const { getAllSchedule, getTicketBySchedule, searchScheduleMulti, getAllAirport, getScheduleSortArriveBegin, getScheduleSortArriveEnd, getScheduleSortDeptBegin, getScheduleSortDeptEnd, getScheduleShortest, getScheduleFavorite } = ticketService



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
		console.log(req.query)
        const airport = await getAllAirport(req.query.search)
        if (Array.isArray(airport) && airport.length > 0) {
            return res.status(200).json({
                message: "All Data Airport",
                airport: airport
            })
        }
    }


    static async getScheduleSortArriveBegin(req, res) {
        const schedule = await getScheduleSortArriveBegin()
        if (Array.isArray(schedule) && schedule.length > 0) {
            return res.status(200).json({
                message: "All Data Airport Sort By Fastest Arrive",
                airport: schedule
            })
        }
    }

    static async getScheduleSortArriveEnd(req, res) {
        const schedule = await getScheduleSortArriveEnd()
        if (Array.isArray(schedule) && schedule.length > 0) {
            return res.status(200).json({
                message: "All Data Airport Sort By Latest Arrive",
                airport: schedule
            })
        }
    }

    static async getScheduleSortDeptBegin(req, res) {
        const schedule = await getScheduleSortDeptBegin()
        if (Array.isArray(schedule) && schedule.length > 0) {
            return res.status(200).json({
                message: "All Data Airport Sort By Fastest Departure",
                schedule: schedule
            })
        }
    }
    
    static async getScheduleSortDeptEnd(req, res) {
        const schedule = await getScheduleSortDeptEnd()
        if (Array.isArray(schedule) && schedule.length > 0) {
            return res.status(200).json({
                message: "All Data Airport Sort By Latest Departure",
                schedule: schedule
            })
        }
    }
    
    static async getScheduleShortest(req, res) {
        const schedule = await getScheduleShortest()
        if (Array.isArray(schedule) && schedule.length > 0) {
            return res.status(200).json({
                message: "All Data Airport Sort By Shortest Fligth",
                schedule: schedule
            })
        }
    }
    
    static async getScheduleFavorite(req, res) {
        const schedule = await getScheduleFavorite()
        if (Array.isArray(schedule) && schedule.length > 0) {
            return res.status(200).json({
                message: "All Data Favorite Schedule",
                schedule: schedule
            })
        }
    }


}