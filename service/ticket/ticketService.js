const { Schedule, Plane, Airport, Class, Airline, Country } = require("../../models");
const { Op } = require('sequelize')

const findScheduleService = async (id) => {
	const data = Schedule.findByPk(id, {
		attributes: { exclude: ["createdAt", "updatedAt", "planeId", "originAirportId", "destinationAirportId", "classId"] },
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
				include: [
					{
						model: Airline,
						as: "airline",
						attributes: { exclude: ["createdAt", "updatedAt",] },
					}
				]
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

const searchScheduleMultiService = async (query) => {
	const {
		departureDate,
		arrivedDate,
		originAirport,
		destinationAirport,
		order
	} = query
	console.log(query)
	let whereConditions = {
		available_seat: { [Op.gte]: 2 }
	}
	if (departureDate && arrivedDate) {
		whereConditions = {
			...whereConditions,
			departureDate: departureDate,
			arrivedDate: arrivedDate
		};
	} else if (departureDate) {
		whereConditions = {
			...whereConditions,
			departureDate: departureDate
		};
	} else if (arrivedDate) {
		whereConditions = {
			...whereConditions,
			arrivedDate: arrivedDate
		};
	}

	const orderOptions = []
	if (order === 'price') {
		orderOptions.push(['provTotalPrice', 'ASC'])
	} else if (order === 'arriveAsc') {
		orderOptions.push(['arrivedDateTime', 'ASC'])
	} else if (order === 'arriveDesc') {
		orderOptions.push(['arrivedDateTime', 'DESC'])
	} else if (order === 'departureAsc') {
		orderOptions.push(['departureDateTime', 'ASC'])
	} else if (order === 'departureDesc') {
		orderOptions.push(['departureDateTime', 'DESC'])
	} else if (order === 'duration') {
		orderOptions.push(['durationInSecond', 'ASC'])
	}


	const data = await Schedule.findAll({
		attributes: {
			exclude: ["createdAt", "", "originAirportId", "destinationAirportId", "planeId", "classId"]
		},
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
				include: [
					{
						model: Airline,
						as: "airline",
						attributes: { exclude: ["createdAt", "updatedAt",] },
					}
				]
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
					city: {
						[Op.iLike]: `${originAirport}`,
					}
				} : {}
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] },
				where: destinationAirport ? {
					city: {
						[Op.iLike]: `${destinationAirport}`,
					}
				} : {}
			},
		],
		where: whereConditions,
		order: orderOptions
	})
	return data


}

const getAirportService = async (search) => {
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

const getScheduleFavoriteService = async (continent) => {
	const data = Schedule.findAll({
		attributes: { exclude: ["updatedAt", "createdAt", "classId", 'planeId', 'originAirportId', 'destinationAirportId'] },
		limit: 10,
		order: [
			["updatedAt", "ASC"]
		],
		where: continent ? {
			"$destinationAirport.country.continent$": {
				[Op.iLike]: `%${continent}%`,
			},
		} : {},
		include: [
			{
				model: Plane,
				as: "plane",
				attributes: { exclude: ["createdAt", "updatedAt",] },
				include: [
					{
						model: Airline,
						as: "airline",
						attributes: { exclude: ["createdAt", "updatedAt",] },
					}
				]
			},
			{
				model: Class,
				as: 'class',
				attributes: { exclude: ["createdAt", "updatedAt", "id"] },
			},
			{
				model: Airport,
				as: "originAirport",
				include: [
					{
						model: Country,
						as: "country",
						attributes: { exclude: ["createdAt", "updatedAt",] },
					}
				],
				attributes: { exclude: ["createdAt", "updatedAt"] }
			},
			{
				model: Airport,
				as: "destinationAirport",
				attributes: { exclude: ["createdAt", "updatedAt"] },
				include: [
					{
						model: Country,
						as: "country",
						attributes: { exclude: ["createdAt", "updatedAt",] },
					}
				],
			},
		]
	})
	return data
}

module.exports = {
	findScheduleService,
	searchScheduleMultiService,
	getAirportService,
	getScheduleFavoriteService
}
