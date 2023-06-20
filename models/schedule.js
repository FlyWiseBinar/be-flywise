"use strict"
const {
	Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Schedule extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Schedule.belongsTo(models.Plane, { as: "plane", foreignKey: "planeId" })
			Schedule.belongsTo(models.Class, { as: "class", foreignKey: "classId" })
			Schedule.belongsTo(models.Airport, { as: "originAirport", foreignKey: "originAirportId" })
			Schedule.belongsTo(models.Airport, { as: "destinationAirport", foreignKey: "destinationAirportId" })
		}
	}
	Schedule.init({
		classId: DataTypes.INTEGER,
		planeId: DataTypes.INTEGER,
		originAirportId: DataTypes.INTEGER,
		destinationAirportId: DataTypes.INTEGER,
		departureDate: DataTypes.DATEONLY,
		arrivedDate: DataTypes.DATEONLY,
		departureTime: DataTypes.TIME,
		arrivedTime: DataTypes.TIME,
		departureDateTime: DataTypes.DATE,
		arrivedDateTime: DataTypes.DATE,
		adultPrice: DataTypes.INTEGER,
		kidsPrice: DataTypes.INTEGER,
		babyPrice: DataTypes.INTEGER,
		taxPrice: DataTypes.INTEGER,
		available_seat: DataTypes.INTEGER,
		provTotalPrice: DataTypes.INTEGER,
		durationInSecond: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "Schedule",
	})
	return Schedule
}