"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    let schedule = [];

    for (let i = 0; i < 100; i++) {
      const randDate = randomDate(
        new Date("2023-06-01"),
        new Date("2023-06-30")
      )
      let planeId = getRandomInt(600)
      let originAirportId = getRandomInt(604)
      let destinationAirportId = getRandomInt(604)

      const randDepartureDate = randDate;
      let randArriveDateMax = new Date(randDepartureDate);
      randArriveDateMax.setDate(randArriveDateMax.getDate() + 2);
      const randArriveDate = randomDate(randDepartureDate, randArriveDateMax);

      let arrivedDate = getDateOnly(randArriveDate.addHours(getRandomInt(9)));
      let arrivedTime = getTimeOnly(randArriveDate);
      let departureDate = getDateOnly(randDepartureDate);
      let departureTime = getTimeOnly(randDepartureDate);

      let arrivedDateTime = new Date(arrivedDate + ' ' + arrivedTime);
      let departureDateTime = new Date(departureDate + ' ' + departureTime);
      let durationInSecond = Math.floor((arrivedDateTime - departureDateTime) / 1000);

      for (let j = 0; j < 3; j++) {
        const kelas = getClassPercen(j);
        const initialPrice = getClassPrice(kelas.minPercen, kelas.maxPercen);

        let adultPrice = getPercentagePrice(initialPrice, 100)
        let kidsPrice = getPercentagePrice(initialPrice, 30)
        let babyPrice = getPercentagePrice(initialPrice, 10)
        let taxPrice = getPercentagePrice(initialPrice, 3)

        schedule.push({
          classId: j + 1,
          planeId: planeId,
          originAirportId: originAirportId,
          destinationAirportId: destinationAirportId,
          departureDate: departureDate,
          departureTime: departureTime,
          arrivedDate: arrivedDate,
          arrivedTime: arrivedTime,
          departureDateTime: departureDateTime,
          arrivedDateTime: arrivedDateTime,
          adultPrice: adultPrice,
          kidsPrice: kidsPrice,
          babyPrice: babyPrice,
          taxPrice: taxPrice,
          available_seat: getRandomInt(10) * 10,
          provTotalPrice: adultPrice + kidsPrice + babyPrice + taxPrice,
          durationInSecond: durationInSecond,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("Schedules", schedule, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Schedules", null, {});
  },
};

function randomDate(start, end) {
  const minValue = start.getTime();
  const maxValue = end.getTime();
  const timestamp = Math.floor(
    Math.random() * (maxValue - minValue + 1) + minValue
  );
  return new Date(timestamp);
}

function getDateOnly(date) {
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

function getTimeOnly(date) {
  return date.getHours() + ":" + date.getMinutes();
}

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getClassPercen(index) {
  const props = [
    {
      classId: 1,
      minPercen: 6,
      maxPercen: 13,
    },
    {
      classId: 2,
      minPercen: 23,
      maxPercen: 54,
    },
    {
      classId: 3,
      minPercen: 90,
      maxPercen: 110,
    },
  ];

  return props[index];
}

function getClassPrice(minPercen, maxPercen) {
  let initialPrice = 13000000;

  let randomnumber = getRandomRange(minPercen, maxPercen);

  return (Math.floor(randomnumber) / 100) * initialPrice;
}

function getPercentagePrice(price, percentage) {
  return (percentage / 100) * price;
}

