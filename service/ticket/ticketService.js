const { Detail_Order, Order, Schedule, User, Plane, Airport, Airline, Class } = require("../../models");

const getAllTicket = async () => {
    const data = Schedule.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
                model: Schedule,
                as: "schedule",
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                        model: Class,
                        as: 'class',
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                    {
                        model: Plane,
                        as: "plane",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    }
                ]
            }
        ]
    });

    const tickets = await Promise.all(data.map(async (schedule) => {
        const { plane } = schedule;
        const planeData = await Plane.findByPk(plane.id, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Airline,
                    as: "airline",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ],
        });
        const ticket = {
            schedule,
            plane: planeData,
        };
        return ticket;
    }));

    return tickets;
};

module.exports = { getAllTicket };
