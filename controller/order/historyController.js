const { historyOrderService, searchHistoryService, filterHistoryService } = require("../../service/order/historyService")
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
        const authheader = req.header("Authorization")
        const tokenUser = authheader && authheader.split(" ")[1]
        const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)
        const orderId = req.query.orderId
        const userId = decoded.userId
        const orders = await searchHistoryService(orderId, userId)
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