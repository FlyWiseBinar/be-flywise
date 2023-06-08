"use strict"
const {
	Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Plane extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Plane.belongsTo(models.Airline, {as: "airline", foreignKey: "airlineId"})
			Plane.belongsTo(models.Class, {as: "class", foreignKey: "classId"})
		}
	}
	Plane.init({
		airlineId: DataTypes.INTEGER,
		classId: DataTypes.INTEGER,
		baggageMaxCapacity: DataTypes.INTEGER,
		cabinMaxCapacity: DataTypes.INTEGER,
		passengerCapacity: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: "Plane",
	})
	return Plane
}