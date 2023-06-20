const { Detail_Order, Order, Schedule, User, Plane, Airport, Airline, Class, sequelize } = require("../../models");
const { Op, where } = require('sequelize')

const getAllSchedule = async () => {
	const data = Schedule.findAll({
		attributes: { exclude: ["createdAt", "updatedAt", "planeId", "originAirportId", "destinationAirportId", "classId"] },
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
			},
			{
				model: Class,
				as: 'class',
				attributes: { exclude: ["createdAt", "updatedAt", "id"] },
			},
			{
				model: Airport,
				as: "originAirport",
				attributes: { exclude: ["createdAt", "updatedAt", "countryCode", "airportCode", "id"] }
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt", "countryCode", "airportCode", "id"] }
			},
		]
	});
	return data;
};

const getTicketBySchedule = async (id) => {
	const data = Schedule.findByPk(id, {
		attributes: {
			exclude: ["createdAt", "updatedAt", "originAirportId", "destinationAirportId", "planeId", "classId"]
		},
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
			},
			{
				model: Class,
				as: 'class',
				attributes: { exclude: ["createdAt", "updatedAt", "id"] },
			},
			{
				model: Airport,
				as: "originAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
		]

	})

	return data
}

const searchScheduleMulti = async (params) => {
	const {
		departureDate,
		arrivedDate,
		originAirport,
		destinationAirport,
		order
	} = params
	console.log('params', params);

	const orderOptions = []

	if (order === 'price') {
		orderOptions.push(['adultPrice', 'ASC'])
	} else if (order === 'arriveAsc') {
		orderOptions.push(['arrivedDate', 'ASC'])
	} else if (order === 'arriveDesc') {
		orderOptions.push(['arrivedDate', 'DESC'])
	} else if (order === 'departureAsc') {
		orderOptions.push(['departureDate', 'ASC'])
	} else if (order === 'departureDesc') {
		orderOptions.push(['departureDate', 'DESC'])
	}
	console.log('order opt', orderOptions);

	try {
		const data = await Schedule.findAll({
			attributes: {
				exclude: ["createdAt", "", "originAirportId", "destinationAirportId", "planeId", "classId"]
			},
			include: [
				{
					model: Plane,
					as: "plane",
					attributes: { exclude: ["createdAt", "updatedAt",] },
				},
				{
					model: Class,
					as: 'class',
					attributes: { exclude: ["createdAt", "updatedAt", "id"] },
				},
				{
					model: Airport,
					as: "originAirport",
					attributes: { exclude: ["createdAt", "updatedAt"] },
					where: originAirport ? {
						[Op.or]: [
							{ city: `${originAirport}` },
						]
					} : {}
				},
				{
					model: Airport,
					as: "destinationAirport",
					attributes: { exclude: ["createdAt", "updatedAt"] },
					where: destinationAirport ? {
						[Op.or]: [
							{ city: `${destinationAirport}` },
						]
					} : {}
				},
			],
			where: departureDate && arrivedDate ? {
				[Op.or]: [{
					arrivedDate: {
						[Op.between]: [`${departureDate}`, `${arrivedDate}`]
					},
					departureDate: {
						[Op.between]: [`${departureDate}`, `${arrivedDate}`]
					}
				}],
				available_seat: { [Op.gte]: 2 }
			} : {},
			order: orderOptions
		})
		return data

	} catch (error) { }
}

const getAllAirport = async (search) => {
	const data = Airport.findAll({
		attributes: { exclude: ["updatedAt", "createdAt"] },
		where: {
			[Op.or]: [
				{
					city: {
						[Op.iLike]: `%${search}%`
					}
				},
				{
					airportCode: {
						[Op.iLike]: `%${search}%`
					}
				}
			]
		}
	})
	return data
}

const getScheduleSortArriveBegin = async () => {
	const data = Schedule.findAll({
		attributes: { exclude: ["updatedAt", "createdAt", "classId", 'planeId', 'originAirportId', 'destinationAirportId'] },
		order: [
			["arrivedDate", "ASC"]
		],
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
			},
			{
				model: Class,
				as: 'class',
				attributes: { exclude: ["createdAt", "updatedAt", "id"] },
			},
			{
				model: Airport,
				as: "originAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
		]
	})
	return data
}

const getScheduleSortArriveEnd = async () => {
	const data = Schedule.findAll({
		attributes: { exclude: ["updatedAt", "createdAt", "classId", 'planeId', 'originAirportId', 'destinationAirportId'] },
		order: [
			["arrivedDate", "DESC"]
		],
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
			},
			{
				model: Class,
				as: 'class',
				attributes: { exclude: ["createdAt", "updatedAt", "id"] },
			},
			{
				model: Airport,
				as: "originAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
		]
	})
	return data
}

const getScheduleSortDeptBegin = async () => {
	const data = Schedule.findAll({
		attributes: { exclude: ["updatedAt", "createdAt", "classId", 'planeId', 'originAirportId', 'destinationAirportId'] },
		order: [
			["departureDate", "ASC"]
		],
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
			},
			{
				model: Class,
				as: 'class',
				attributes: { exclude: ["createdAt", "updatedAt", "id"] },
			},
			{
				model: Airport,
				as: "originAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
		]
	})
	return data
}

const getScheduleSortDeptEnd = async () => {
	const data = Schedule.findAll({
		attributes: { exclude: ["updatedAt", "createdAt", "classId", 'planeId', 'originAirportId', 'destinationAirportId'] },
		order: [
			["departureDate", "DESC"]
		],
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
			},
			{
				model: Class,
				as: 'class',
				attributes: { exclude: ["createdAt", "updatedAt", "id"] },
			},
			{
				model: Airport,
				as: "originAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
		]
	})
	return data
}

const getScheduleShortest = async () => {
	const data = Schedule.findAll({
		attributes: { exclude: ["updatedAt", "createdAt"] },
		date: {
			[Op.between]: [startOfDay(parseISO())]
		}
	})
	return data
}

const getScheduleFavorite = async () => {
	const data = Schedule.findAll({
		attributes: { exclude: ["updatedAt", "createdAt", "classId", 'planeId', 'originAirportId', 'destinationAirportId'] },
		limit: 10,
		order: [
			["updatedAt", "ASC"]
		],
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
			},
			{
				model: Class,
				as: 'class',
				attributes: { exclude: ["createdAt", "updatedAt", "id"] },
			},
			{
				model: Airport,
				as: "originAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
		]
	})
	return data
}

module.exports = { getAllSchedule, getTicketBySchedule, searchScheduleMulti, getAllAirport, getScheduleSortArriveBegin, getScheduleSortArriveEnd, getScheduleSortDeptBegin, getScheduleSortDeptEnd, getScheduleShortest, getScheduleFavorite };
