/* eslint-disable no-undef */
const { historyOrderService, searchHistoryService } = require("../../service/order/historyService")
const jwt = require("jsonwebtoken")

module.exports = class historyController {
    static async getAllHistoryOrders(req, res) {
        const authheader = req.header("Authorization")
        const tokenUser = authheader && authheader.split(" ")[1]
        const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)
        try {
            const userId = decoded.userId
            const orders = await historyOrderService(userId)
            res.status(200).json(orders)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    }
    static async searchHistoryOrders(req, res) {
        const orderId = req.query.orderId
        try {
            const orders = await searchHistoryService(orderId)
            res.status(200).json(orders)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    }
}