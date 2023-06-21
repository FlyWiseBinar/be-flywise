const {
  Order,
  Detail_Order,
  Detail_Passenger,
  Schedule,
} = require("../../models");

const checkOutService = async (userId, schedule, passenger) => {
  const totalPrice = await findTotalPrice(schedule, passenger);

  const order = await createOrder(userId, totalPrice);
  const schedules = await createDetailOrder(order.id, schedule);
  const passengers = await createDetailPassenger(order.id, passenger);
  console.log(passenger.length);

  const data = {
    ...order,
    schedule: schedules,
    passenger: passengers,
  };

  await updateAvailSeatSchedule(schedule, passenger.length);

  return data;
};

const createOrder = async (userId, price) => {
  const orderCode = generateRandomString(15);
  const data = await Order.create({
    userId: userId,
    orderCode: orderCode,
    totalPrice: price,
  });

  return data.toJSON();
};

const createDetailOrder = async (orderId, schedule) => {
  var data = [];

  console.log(schedule);

  for (let i = 0; i < schedule.length; i++) {
    data.push(
      await Detail_Order.create({
        orderId: orderId,
        scheduleId: schedule[i].id,
      })
    );
  }

  return data;
};

const createDetailPassenger = async (orderId, passenger) => {
  var data = [];

  for (let i = 0; i < passenger.length; i++) {
    data.push(
      await Detail_Passenger.create({
        orderId: orderId,
        name: passenger[i].name,
        birthdate: passenger[i].birthdate,
        nationality: passenger[i].nationality,
        ktp: passenger[i].ktp,
        passport: passenger[i].passport,
        issuingCountry: passenger[i].issuingCountry,
        expiredAt: passenger[i].expiredAt,
        ageType: passenger[i].ageType,
      })
    );
  }

  return data;
};

const findOneSchedule = async (id) => {
  const data = await Schedule.findOne({
    where: {
      id,
    },
  });

  return data.toJSON();
};

const updateAvailSeatSchedule = async (schedule, sumPassenger) => {
  for (let i = 0; i < schedule.length; i++) {
    const detail_schedule = await findOneSchedule(schedule[i].id);
    await Schedule.update(
      {
        available_seat: detail_schedule.available_seat - sumPassenger,
      },
      {
        where: {
          id: schedule[i].id,
        },
      }
    );
  }
};

const generateRandomString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const findTotalPrice = async (schedule, passenger) => {
  let price = 0;

  for (let i = 0; i < schedule.length; i++) {
    let jsonSchedule = await findOneSchedule(schedule[i].id);

    for (let j = 0; j < passenger.length; j++) {
      if (passenger[j].ageType == "adult") {
        price += jsonSchedule.adultPrice;
      }
      if (passenger[j].ageType == "kids") {
        price += jsonSchedule.kidsPrice;
      }
      if (passenger[j].ageType == "baby") {
        price += jsonSchedule.babyPrice;
      }
    }
    price += jsonSchedule.taxPrice;
  }

  return price;
};

module.exports = checkOutService;
