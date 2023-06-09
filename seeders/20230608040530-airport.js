"use strict";

/** @type {import('sequelize-cli').Migration} */

const fs = require("fs");
let json = fs.readFileSync("data/airport.json");
let data = JSON.parse(json);

module.exports = {
  async up(queryInterface, Sequelize) {
    var airport = [];

    data.forEach((index) => {
      airport.push({
        airportCode: index.iata_code,
        countryCode: index.iso_country,
        name: index.name,
        city: index.municipality,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("Airports", airport, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airports", null, {});
  },
};
