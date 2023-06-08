"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        orderId: 1,
        name: "Passenger_Test_1",
        birthdate: "1999-02-20",
        nationality: "Indonesia",
        ktp: "3321110902070002",
        passport: "996202793",
        issuingCountry: "Indonesia",
        expiredAt: "2023-10-22",
        ageType: "adult",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Detail_Passengers", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Detail_Passengers", null, {});
  },
};
