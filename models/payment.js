"use strict"
const {
	Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Payment.belongsTo(models.Order, {as: "order", foreignKey: "orderId"})
			Payment.belongsTo(models.Payment_Type, {as: "paymentType", foreignKey: "paymentTypeId"})
		}
	}
	Payment.init({
		payment_code: DataTypes.STRING,
		orderId: DataTypes.INTEGER,
		paymentTypeId: DataTypes.INTEGER,
		status: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: "Payment",
	})
	return Payment
}