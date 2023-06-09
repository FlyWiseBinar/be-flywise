const { Schedule, Plane, Airport } = require("../../models")

const getSchedule = async (id) =>{
    const data = Schedule.findOne({
        where: {id},
        include: [
            {
                model: Plane,
                as: "plane"
            },
            {
                model: Airport,
                as: "originAirport"
            },
            {
                model: Airport,
                as: "destinationAirport"
            }
        ]
    })

    return data
}

const createOrder = async (userId, price, schedule, passenger) => {
    const data = await Order.create({
        userId: userId,
        totalPrice: price
    })

    const schedules = await createDetailOrder(data.id, schedule)
    const passengers = await createDetailPassenger(data.id, passenger)

    data.schedule = schedules
    data.passenger = passengers

    return data
}

const createDetailOrder = async (orderId, schedules) => {
    var datas = []

    for (const schedule of schedules){
        datas.push(
            await Detail_Order.create({
                orderId: orderId,
                scheduleId: schedule.id
            })
        )
        
    }

    return datas;
}

const createDetailPassenger = async (orderId, passengers) => {
    var datas = []

    for (const passenger of passengers){
        datas.push(
            await Detail_Order.create({
                orderId: orderId,
                name: passenger.name,
                birthdate: passenger.birthdate,
                nationality: passenger.nationality,
                ktp: passenger.ktp,
                passport: passenger.passport,
                issuingCountry: passenger.issuingCountry,
                expiredAt: passenger.expiredAt,
                ageType: passenger.ageType
            })
        )
    }

    return datas;
}

module.exports = {
    getSchedule,
    createOrder,
}

