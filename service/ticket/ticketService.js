const { Detail_Order, Order, Schedule, User, Plane, Airport, Airline, Class, sequelize } = require("../../models");

const getAllSchedule = async () => {
    const data = Schedule.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "planeId", "originAirportId", "destinationAirportId", "babyPrice", "kidsPrice", "adultPrice"] },
        include: [
            {
                model: Plane,
                as: "plane",
                attributes: { exclude: ["createdAt", "updatedAt",] },
                include: [
                    {
                        model: Class,
                        as: 'class',
                        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
                    },

                ]
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
                include: [
                    {
                        model: Class,
                        as: 'class',
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },

                ]
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

module.exports = { getAllSchedule, getTicketBySchedule };
