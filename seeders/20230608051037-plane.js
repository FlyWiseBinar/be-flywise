"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    var plane = [];

    for (let i = 0; i < 600; i++) {
      plane.push({
        airlineId: getRandomInt(21),
        baggageMaxCapacity: [30, 35, 40, 45].random(),
        cabinMaxCapacity: getRandomRange(5, 9),
        passengerCapacity: Math.floor(getRandomRange(5, 9)) * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    await queryInterface.bulkInsert("Planes", plane, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Planes", null, {});
  },
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
