const {checkOutService} = require("../../service/order")

module.exports = class checkoutController {
	static async scheduleDetail (req, res) {
        const scheduleID = req.body.scheduleId;
        const data = await checkOutService.getSchedule(scheduleID)
        
        if(!data){
            return res.status(400).json({
                status: false,
                message: "Schedule Data Not Found"
            })
        }
        
        res.status(200).json({
            status: true,
            message: "Schedule data has been successfully retrieved",
            data: data
        })
    }

    static async makeOrder (req, res) {
        const { price, schedule, passenger } = req.body

        const authHeader = req.header("Authorization");
        const tokenUser = authHeader.split(" ")[1];
        const decoded = jwt.verify(tokenUser, process.env.JWT_SECRET_TOKEN);
        const userId = decoded.userId;

        const order = await checkOutService.createOrder(userId, price, schedule, passenger)

        res.status(200).json({
            status: true,
            message: "Order has been created succesfully",
            data: order
        })
    }
}