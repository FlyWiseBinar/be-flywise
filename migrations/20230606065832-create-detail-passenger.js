"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Detail_Passengers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      nationality: {
        type: Sequelize.STRING
      },
      ktp: {
        type: Sequelize.STRING
      },
      passport: {
        type: Sequelize.STRING
      },
      issuingCountry: {
        type: Sequelize.STRING
      },
      expiredAt: {
        type: Sequelize.DATEONLY
      },
      ageType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Detail_Passengers")
  }
}