const { ticketService } = require("../../service/ticket")
const { getAllSchedule,getTicketBySchedule } = ticketService



module.exports = class ticketController {
    static async getAllSchedule(req, res) {
        const schedule = await getAllSchedule()
        if (schedule.lenght == 0) {
            return res.status(400).json({
                status: false,
                message: "No Schedules"
            })
        } else {
            res.status(200).json({
                schedule
            })
        }
    }
    
    
    static async getTicketBySchedule(req, res){
        const id  = req.params.id
        const ticket = await getTicketBySchedule(id)
        if(ticket.length == 0){
            return res.status(400).json({
                status: false,
                message: 'no ticket'
            })
        }else{
            return res.status(200).json({
                ticket
            })
        }
    }
}