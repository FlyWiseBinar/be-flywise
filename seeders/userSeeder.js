"use strict"
const bcrypt = require("bcrypt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const user = [
			{
				email: "alvinardi85@gmail.com",
				telephone: "0812345678901",
				password: bcrypt.hashSync("password", 10),
				fullName: "Alvin Ardi",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "alvindian85@gmail.com",
				telephone: "0812345678902",
				password: bcrypt.hashSync("password", 10),
				fullName: "Alvin Dian",
				status: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "faisalmaulanaputra@gmail.com",
				telephone: "0812345678902",
				password: bcrypt.hashSync("password", 10),
				fullName: "Faisal Maulana",
				status: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]

		await queryInterface.bulkInsert("Users", user, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {})
	},
}