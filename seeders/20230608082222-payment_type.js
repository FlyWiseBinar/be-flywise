"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        name: "GoPay",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Virtual Account",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Credit Card",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Payment_Types", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Payment_Types", null, {});
  },
};
