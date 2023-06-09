"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Schedules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      planeId: {
        type: Sequelize.INTEGER
      },
      originAirportId: {
        type: Sequelize.INTEGER
      },
      destinationAirportId: {
        type: Sequelize.INTEGER
      },
      departureDate: {
        type: Sequelize.DATEONLY
      },
      arrivedDate: {
        type: Sequelize.DATEONLY
      },
      departureTime: {
        type: Sequelize.TIME
      },
      arrivedTime: {
        type: Sequelize.TIME
      },
      adultPrice: {
        type: Sequelize.INTEGER
      },
      kidsPrice: {
        type: Sequelize.INTEGER
      },
      babyPrice: {
        type: Sequelize.INTEGER
      },
      taxPrice: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable("Schedules")
  }
}