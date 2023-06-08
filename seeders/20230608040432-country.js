"use strict";

/** @type {import('sequelize-cli').Migration} */

const fs = require("fs");
let json = fs.readFileSync("data/country.json");
let data = JSON.parse(json);

module.exports = {
  async up(queryInterface, Sequelize) {
    var countries = [];

    data.forEach((index) => {
      countries.push({
        countryCode: index.code,
        name: index.name,
        continent: index.continent,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("Countries", countries, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Countries", null, {});
  },
};
