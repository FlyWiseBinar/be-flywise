'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkUpdate("Schedules", {
      classId: 3
    }, {
      id: {
        [Op.between]: [
          667, 1000
        ]
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate("Schedules", {
      classId: 0
    }, {
      classId: 1
    });
  }
};
