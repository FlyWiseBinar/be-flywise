"use strict";

/** @type {import('sequelize-cli').Migration} */

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getPropsPlane(classPlane) {
  const PropsPlane = {
    airlineId: getRandomInt(21),
    classId: classPlane,
    baggageMaxCapacity: [30, 35, 40, 45].random(),
    cabinMaxCapacity: getRandomRange(5, 9),
    passengerCapacity: Math.floor(getRandomRange(5, 9)) * 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return PropsPlane;
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

module.exports = {
  async up(queryInterface, Sequelize) {
    var plane = [];

    for (let i = 0; i < 600; i++) {
      if (i > 550) {
        plane.push(getPropsPlane(3));
      } else if (i > 300 && i <= 550) {
        plane.push(getPropsPlane(2));
      } else {
        plane.push(getPropsPlane(1));
      }
    }

    await queryInterface.bulkInsert("Planes", plane, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Planes", null, {});
  },
};
