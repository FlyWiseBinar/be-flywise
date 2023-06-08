"use strict"
const {
	Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Detail_Passenger extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Detail_Passenger.belongsTo(models.Order, {as: "order", foreignKey: "orderId"})
		}
	}
	Detail_Passenger.init({
		orderId: DataTypes.INTEGER,
		name: DataTypes.STRING,
		birthdate: DataTypes.DATEONLY,
		nationality: DataTypes.STRING,
		ktp: DataTypes.STRING,
		passport: DataTypes.STRING,
		issuingCountry: DataTypes.STRING,
		expiredAt: DataTypes.DATEONLY,
		ageType: DataTypes.STRING
	}, {
		sequelize,
		modelName: "Detail_Passenger",
	})
	return Detail_Passenger
}