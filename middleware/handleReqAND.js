const handleReqAND = (req, res, next) => {
    if(!req.body.schedule){
        console.log(req.body.departTicketId);
        const {departTicketId , returnTicketId} = req.body;
        const schedule = [
            {
                id:departTicketId
            },
            {
                id:returnTicketId
            }
        ]
        req.body.schedule = schedule
    }

    next();
}

module.exports = handleReqAND