"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = [
      {
        email: "Test_User_1@test.com",
        telephone: "081234567890",
        password:
          "$2a$12$zWLSgKSzMptgqg9F1Wz1VuFHgCnJDfln.S/OPOrg1ynOoLucbaGua",
        fullName: "Test_User_1_Full_Name",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", user, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
