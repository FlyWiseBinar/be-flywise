'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Schedules", "classId", {
      type: Sequelize.INTEGER
    })
    await queryInterface.addConstraint("Schedules", {
      fields: ["classId"],
      type: "foreign key",
      name: "schedule-classId",
      references: {
        table: "Classes",
        field: "id"
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Schedules", "Schedule_ClassId")
    await queryInterface.removeColumn("Schedules", "classId")
  }
};
