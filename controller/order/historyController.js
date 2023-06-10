const historyService = require("../../service/order/historyService")

module.exports = class historyController {
    static async getAllHistoryOrders(req, res) {
        try {
            const orders = await historyService(req.body)
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}