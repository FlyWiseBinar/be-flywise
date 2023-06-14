const { ticketService } = require("../../service/ticket")
const { getAllTicket } = ticketService
const jwt = require("jsonwebtoken")


module.exports = class ticketController {
    static async getAllTicket(req, res) {
        const authheader = req.header("Authorization")
        const tokenUser = authheader && authheader.split(" ")[1]
        const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)
        const ticket = await getAllTicket()
        if (ticket.lenght == 0) {
            return res.status(400).json({
                status: false,
                message: "No Tickets"
            })
        } else {
            res.status(200).json({
                ticket
            })
        }
    }
}