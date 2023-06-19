"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    var schedule = [];

    for (let i = 0; i < 10000; i++) {
      const randDate = randomDate(
        new Date("2023-06-01"),
        new Date("2023-06-30")
      );

      const scheduleProps = {
        planeId: getRandomInt(600),
        originAirportId: getRandomInt(604),
        destinationAirportId: getRandomInt(604),
        departureDate: getDateOnly(randDate),
        departureTime: getTimeOnly(randDate),
        arrivedDate: getDateOnly(randDate.addHours(getRandomInt(9))),
        arrivedTime: getTimeOnly(randDate),
      };

      for (let i = 0; i < 3; i++) {
        const kelas = getClassPercen(i);
        const initialPrice = getClassPrice(kelas.minPercen, kelas.maxPercen);

        schedule.push({
          classId: i + 1,
          ...scheduleProps,
          adultPrice: getPercentagePrice(initialPrice, 100),
          kidsPrice: getPercentagePrice(initialPrice, 30),
          babyPrice: getPercentagePrice(initialPrice, 10),
          taxPrice: getPercentagePrice(initialPrice, 3),
          available_seat: getRandomInt(10) * 10,
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
  var initialPrice = 13000000;

  var randomnumber = getRandomRange(minPercen, maxPercen);

  return (Math.floor(randomnumber) / 100) * initialPrice;
}

function getPercentagePrice(price, percentage) {
  return (percentage / 100) * price;
}

