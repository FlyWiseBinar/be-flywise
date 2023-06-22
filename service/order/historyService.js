const { Detail_Order, Order, Schedule, User, Plane, Airport, Airline, Class, Country, Detail_Passenger } = require("../../models")

const historyOrderService = async (userId) => {
    const data = Detail_Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
                model: Order,
                as: "order",
                where: { userId: userId },
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: { exclude: ["createdAt", "updatedAt", "password"] },

                    },
                    {
                        model: Detail_Passenger,
                        as: "passengers",
                        attributes: { exclude: ["createdAt", "updatedAt"] },

                    }
                ]
            },
            {
                model: Schedule,
                as: "schedule",
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                        model: Plane,
                        as: "plane",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Airline,
                                as: "airline",
                                attributes: { exclude: ["createdAt", "updatedAt"] },
                            },
                        ]
                    },
                    {
                        model: Airport,
                        as: "originAirport",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Country,
                                as: "country",
                                attributes: { exclude: ["createdAt", "updatedAt"] }

                            }
                        ]
                    },
                    {
                        model: Airport,
                        as: "destinationAirport",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Country,
                                as: "country",
                                attributes: { exclude: ["createdAt", "updatedAt"] }

                            }
                        ]
                    },
                    {
                        model: Class,
                        as: "class",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                ]
            },
        ]
    })
    return data
}

const searchHistoryService = async (orderCode, userId) => {
    const data = Detail_Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
                model: Order,
                as: "order",
                where: { userId: userId, orderCode: orderCode },
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: { exclude: ["createdAt", "updatedAt", "password"] },

                    },
                    {
                        model: Detail_Passenger,
                        as: "passengers",
                        attributes: { exclude: ["createdAt", "updatedAt"] },

                    }
                ]
            },
            {
                model: Schedule,
                as: "schedule",
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                        model: Plane,
                        as: "plane",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Airline,
                                as: "airline",
                                attributes: { exclude: ["createdAt", "updatedAt"] },
                            },
                        ]
                    },
                    {
                        model: Airport,
                        as: "originAirport",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Country,
                                as: "country",
                                attributes: { exclude: ["createdAt", "updatedAt"] }

                            }
                        ]
                    },
                    {
                        model: Airport,
                        as: "destinationAirport",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Country,
                                as: "country",
                                attributes: { exclude: ["createdAt", "updatedAt"] }

                            }
                        ]
                    },
                    {
                        model: Class,
                        as: "class",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                ]
            },
        ]
    })
    return data
}
const filterHistoryService = async (date, userId) => {
    const data = Detail_Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
                model: Order,
                as: "order",
                where: { userId: userId },
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: { exclude: ["createdAt", "updatedAt", "password"] },

                    },
                    {
                        model: Detail_Passenger,
                        as: "passengers",
                        attributes: { exclude: ["createdAt", "updatedAt"] },

                    }
                ]
            },
            {
                model: Schedule,
                as: "schedule",
                where: { departureDate: date },
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                        model: Plane,
                        as: "plane",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Airline,
                                as: "airline",
                                attributes: { exclude: ["createdAt", "updatedAt"] },
                            },
                        ]
                    },
                    {
                        model: Airport,
                        as: "originAirport",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Country,
                                as: "country",
                                attributes: { exclude: ["createdAt", "updatedAt"] }

                            }
                        ]
                    },
                    {
                        model: Airport,
                        as: "destinationAirport",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: Country,
                                as: "country",
                                attributes: { exclude: ["createdAt", "updatedAt"] }

                            }
                        ]
                    },
                    {
                        model: Class,
                        as: "class",
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                ]
            },
        ]
    })
    return data
}

module.exports = { historyOrderService, searchHistoryService, filterHistoryService }