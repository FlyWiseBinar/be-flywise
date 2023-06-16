"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Classes",[
        {
          name: "Ekonomi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bisnis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "First Class",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],{});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
