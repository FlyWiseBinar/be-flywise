'use strict';

/** @type {import('sequelize-cli').Migration} */


const inputClassId = (classSchedule) => {
  const PropsPlane = {
    classId: classSchedule
  }
  return PropsPlane
}

module.exports = {
  async up(queryInterface, Sequelize) {
    var classes = [];

    for (let i = 0; i < 600; i++) {
      if (i > 550) {
        classes.push(inputClassId(3));
      } else if (i > 300 && i <= 550) {
        classes.push(inputClassId(2));
      } else {
        classes.push(inputClassId(1));
      }
    }
    await queryInterface.bulkInsert("Schedules", classes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Schedules", null, {});
  }
};
