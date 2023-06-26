const {ticketService} = require("../../service/ticket")
const {
	findScheduleService,
	searchScheduleMultiService,
	getAirportService,
	getScheduleFavoriteService
} = ticketService

module.exports = class ticketController {
	static async findSchedule(req, res) {
		const schedule = await findScheduleService(req.params.id)
		if(schedule) {
			return res.status(200).json({
				statue: true,
				message: 'data schedule',
				data: schedule
			})
		} else {
			return res.status(400).json({
				status: false,
				message: 'schedule not found',
			})
		}
	}
	static async searchScheduleMulti(req, res) {
		const schedule = await searchScheduleMultiService(req.query)
		if(Array.isArray(schedule) && schedule.length > 0) {
			return res.status(200).json({
				statue: true,
				message: 'list all schedule search results',
				data: schedule
			})
		} else {
			return res.status(400).json({
				status: false,
				message: 'no schedule',
			})
		}
	}

	static async getAirportByName(req, res) {
		console.log(req.query)
		const airport = await getAirportService(req.query.search)
		if(Array.isArray(airport) && airport.length > 0) {
			return res.status(200).json({
				statue: true,
				message: "list all airport data",
				data: airport
			})
		} else {
			return res.status(400).json({
				status: false,
				message: 'no airport ',
			})
		}
	}

	static async getScheduleFavorite(req, res) {
		console.log(req.query.continent)
		const continent = req.query.continent || null
		const schedule = await getScheduleFavoriteService(continent)
		if(Array.isArray(schedule) && schedule.length > 0) {
			return res.status(200).json({
				status: true,
				message: "all data favorite schedule",
				data: schedule
			})
		}
	}
}