"use strict"

/** @type {import('sequelize-cli').Migration} */

const generateRandomString = (length) => {
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        userId: 1,
        orderCode: generateRandomString(15),
        totalPrice: 1500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await queryInterface.bulkInsert("Orders", data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {})
  },
}
