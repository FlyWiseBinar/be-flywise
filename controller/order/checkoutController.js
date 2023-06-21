const {checkOutService} = require("../../service/order")

module.exports = class checkoutController {
    static async makeOrder (req, res) {
        const { schedule, passenger } = req.body
        const userId = req.user.id;

        try{
            const order = await checkOutService(userId, schedule, passenger)

            return res.status(200).json({
                status: true,
                message: "Order has been created succesfully",
                data: order
            })
        }catch(error){
            return res.status(500).json({
				status: false,
				message: "internal server error"
			})
        }

        
    }
}