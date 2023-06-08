"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Classes",[
        {
          name: "Ekonomi",
          price: 1000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bisnis",
          price: 3000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "First Class",
          price: 10000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],{});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
