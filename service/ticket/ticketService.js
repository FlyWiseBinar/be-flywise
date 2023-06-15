const { Detail_Order, Order, Schedule, User, Plane, Airport, Airline, Class, sequelize } = require("../../models");

const getAllSchedule = async () => {
    const data = Schedule.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "planeId", "originAirportId", "destinationAirportId"] },
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
                attributes: { exclude: ["createdAt", "upadateAt"] }
            },
            {
                model: Airport,
                as: "destinationAirport",
                attributes: { exclude: ["createdAt", "upadateAt"] }
            },
        ]
    });
    return data;
};

const getTicketBySchedule = async (id) => {
    const data = Schedule.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt", "originAirportId","destinationAirportId", "planeId"]
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
                attributes: { exclude: ["createdAt", "upadateAt"] }
            },
            {
                model: Airport,
                as: "destinationAirport",
                attributes: { exclude: ["createdAt", "upadateAt"] }
            },
        ]

    })

    return data
}

module.exports = { getAllSchedule, getTicketBySchedule };
