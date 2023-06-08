"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        orderId: 1,
        scheduleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Detail_Orders", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Detail_Orders", null, {});
  },
};
