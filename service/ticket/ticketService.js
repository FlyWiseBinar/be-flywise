const { Detail_Order, Order, Schedule, User, Plane, Airport, Airline, Class, sequelize } = require("../../models");
const { Op } = require('sequelize')

const getAllSchedule = async () => {
    const data = Schedule.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "planeId", "originAirportId", "destinationAirportId"] },
        include: [
            {
                model: Plane,
                as: "plane",
                attributes: { exclude: ["createdAt", "updatedAt",] },
            },
            {
                model: Class,
                as: 'class',
                attributes: { exclude: ["createdAt", "updatedAt", "id", "price"] },
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
            exclude: ["createdAt", "updatedAt", "originAirportId", "destinationAirportId", "planeId"]
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
                attributes: { exclude: ["createdAt", "updatedAt"] },
                where: {
                    [Op.or]: [
                        { name: `${classPlane}` },
                    ]
                }
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
    const { departureDate, arrivedDate, originAirport, destinationAirport, classPlane } = params
    console.log('data', params);

    try {
        const data = await Schedule.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "originAirportId", "destinationAirportId", "planeId"]
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
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        [Op.or]: [
                            { name: `${classPlane}` },
                        ]
                    }
                },
                {
                    model: Airport,
                    as: "originAirport",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        [Op.or]: [
                            { city: `${originAirport}` },
                        ]
                    }
                },
                {
                    model: Airport,
                    as: "destinationAirport",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        [Op.or]: [
                            { city: `${destinationAirport}` },
                        ]
                    }
                },
            ],
            where: {
                [Op.and]: [
                    { departureDate: `${departureDate}` },
                    { arrivedDate: `${arrivedDate}` },
                ],
                available_seat: { [Op.gte]: 2 }
            }
        })
        return data
    } catch (error) {

    }
}

const getAllAirport = async () => {
    const data = Airport.findAll({
        attributes: { exclude: ["updatedAt", "createdAt"] }
    })
    return data
}

module.exports = { getAllSchedule, getTicketBySchedule, searchScheduleMulti, getAllAirport };
