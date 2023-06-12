"use strict"
const {
	Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Airport extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Airport.belongsTo(models.Country, { as: "country", foreignKey: "countryCode" })
		}
	}
	Airport.init({
		airportCode: DataTypes.STRING,
		countryCode: DataTypes.STRING,
		name: DataTypes.STRING,
		city: DataTypes.STRING
	}, {
		sequelize,
		modelName: "Airport",
	})
	return Airport
}