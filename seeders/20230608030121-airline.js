"use strict";

/** @type {import('sequelize-cli').Migration} */

const fs = require("fs");
let json = fs.readFileSync("data/airline.json");
let data = JSON.parse(json);

module.exports = {
  async up(queryInterface, Sequelize) {
    var airlines = [];
    data.forEach((index) => {
      airlines.push({
        airlineCode: index.airlineCode,
        airlineName: index.airlineName,
        logo: index.logo,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("Airlines", airlines, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airlines", null, {});
  },
};
