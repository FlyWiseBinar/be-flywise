"use strict";

/** @type {import('sequelize-cli').Migration} */

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

function getPlane() {
  const planeId = getRandomInt(600);

  var props;
  if (planeId <= 300) {
    props = {
      planeID: planeId,
      minPercen: 6,
      maxPercen: 13,
    };
  } else if (planeId > 300 && planeId <= 550) {
    props = {
      planeID: planeId,
      minPercen: 23,
      maxPercen: 54,
    };
  } else {
    props = {
      planeID: planeId,
      minPercen: 90,
      maxPercen: 120,
    };
  }

  return props;
}

function getClassPrice(minPercen, maxPercen) {
  var initialPrice = 13000000;

  var randomnumber = getRandomRange(minPercen, maxPercen);

  return (Math.floor(randomnumber) / 100) * initialPrice;
}

function getPercentagePrice(price, percentage) {
  return (percentage / 100) * price;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    var schedule = [];

    for (let i = 0; i < 1000; i++) {
      const randDate = randomDate(
        new Date("2023-06-01"),
        new Date("2023-06-30")
      );

      const plane = getPlane();

      const initialPrice = getClassPrice(plane.minPercen, plane.maxPercen);

      schedule.push({
        planeId: plane.planeID,
        originAirportId: getRandomInt(604),
        destinationAirportId: getRandomInt(604),
        departureDate: getDateOnly(randDate),
        departureTime: getTimeOnly(randDate),
        arrivedDate: getDateOnly(randDate.addHours(getRandomInt(9))),
        arrivedTime: getTimeOnly(randDate),
        adultPrice: getPercentagePrice(initialPrice, 100),
        kidsPrice: getPercentagePrice(initialPrice, 30),
        babyPrice: getPercentagePrice(initialPrice, 10),
        taxPrice: getPercentagePrice(initialPrice, 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Schedules", schedule, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Schedules", null, {});
  },
};
