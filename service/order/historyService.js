/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Detail_Order, Order, Schedule, User, Plane, Airport, Airline, Class } = require("../../models")
const jwt = require("jsonwebtoken")

const historyOrderService = async (req, res) => {
    // const authheader = req.header("Authorization")
    // const tokenUser = authheader && authheader.split(" ")[1]
    // const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)
    // const userId = decoded.userId
    const data = Order.findAll({
        include: [
            Detail_Order,
            // {
            //     model: Schedule,
            //     as: "schedule",
            //     include: [
            //         {
            //             model: Plane,
            //             as: "plane",
            //             include: [
            //                 {
            //                     model: Airline,
            //                     as: "airline",
            //                 },
            //                 {
            //                     model: Class,
            //                     as: "class",
            //                 },
            //             ]
            //         },
            //         {
            //             model: Airport,
            //             as: "originAirport",
            //         },
            //         {
            //             model: Airport,
            //             as: "destinationAirport",
            //         }
            //     ]
            // },
        ]
    })
    return data
}

module.exports = historyOrderService