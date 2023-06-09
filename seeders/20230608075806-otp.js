"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const otp = [
      {
        id_user: 1,
        otp: "678032",
        expiredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Otps", otp, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Otps", null, {});
  },
};
