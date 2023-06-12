const { Order, Detail_Order, Detail_Passenger } = require("../../models");

const checkOutService = async (userId, price, schedule, passenger) => {
    const order = await createOrder(userId, price)
    const schedules = await createDetailOrder(order.id,schedule)
    const passengers = await createDetailPassenger(order.id,passenger)

    const data = {
        ...order.dataValues,
        schedule: schedules,
        passenger: passengers
    }

    return data
}

const createOrder = async (userId, price) => {
    const orderCode = generateRandomString(15)
    const data = await Order.create({
        userId      : userId,
        orderCode   : orderCode,
        totalPrice  : price
    })

    return data
}

const createDetailOrder = async (orderId, schedule) => {
    var data = []

    console.log(schedule);

    for (let i = 0; i < schedule.length; i++) {
        data.push(
            await Detail_Order.create({
                orderId     : orderId,
                scheduleId  : schedule[i].id
            })
        )
        
    }

    return data
}

const createDetailPassenger = async(orderId, passenger) => {
    var data = []

    for (let i = 0; i < passenger.length; i++) {
        data.push(
            await Detail_Passenger.create({
                orderId         : orderId,
		        name            : passenger[i].name,
		        birthdate       : passenger[i].birthdate,
                nationality     : passenger[i].nationality,
                ktp             : passenger[i].ktp,
                passport        : passenger[i].passport,
                issuingCountry  : passenger[i].issuingCountry,
                expiredAt       : passenger[i].expiredAt,
                ageType         : passenger[i].ageType
            })
        )
        
    }

    return data
}

const generateRandomString = (length) => {
    let result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = checkOutService