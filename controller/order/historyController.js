const { historyOrderService, searchHistoryService, filterHistoryService, historyPassenger } = require("../../service/order/historyService")
const jwt = require("jsonwebtoken")

module.exports = class historyController {
    static async getAllHistoryOrders(req, res) {
        const authheader = req.header("Authorization")
        const tokenUser = authheader && authheader.split(" ")[1]
        const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)
        const userId = decoded.userId
        const orders = await historyOrderService(userId)
        if (orders.length == 0) {
            return res.status(400).json({
                status: false,
                message: "Order not found"
            })
        }
        res.status(200).json({
            orders
        })
    }
    static async getPassenger(req, res) {
        const authheader = req.header("Authorization")
        const tokenUser = authheader && authheader.split(" ")[1]
        const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)
        const userId = decoded.userId
        const orderId = req.body.orderId
        const passenger = await historyPassenger(userId, orderId)
        if (passenger.length == 0) {
            return res.status(400).json({
                status: false,
                message: "Passenger not found"
            })
        }
        res.status(200).json({
            passenger
        })
    }
    static async searchHistoryOrders(req, res) {
        const authheader = req.header("Authorization")
        const tokenUser = authheader && authheader.split(" ")[1]
        const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)
        const orderCode = req.query.orderCode
        const userId = decoded.userId
        const orders = await searchHistoryService(orderCode, userId)
        if (!orders) {
            return res.status(400).json({
                status: false,
                message: "Order not found"
            })
        }
        res.status(200).json({
            orders
        })
    }
    static async filterHistoryOrders(req, res) {
        const authheader = req.header("Authorization")
        const tokenUser = authheader && authheader.split(" ")[1]
        const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)
        const date = req.query.date
        const userId = decoded.userId
        const orders = await filterHistoryService(date, userId)
        if (!orders) {
            return res.status(400).json({
                status: false,
                message: "Order not found"
            })
        }
        res.status(200).json({
            orders
        })
    }
}