"use strict"
const {
	Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Order.belongsTo(models.User, { as: "user", foreignKey: "userId" })
			Order.hasMany(models.Detail_Order, { as: "schedules", foreignKey: "orderId" })
			Order.hasMany(models.Detail_Passenger, {as: "passengers", foreignKey:"orderId"})
		}
	}
	Order.init({
		userId: DataTypes.INTEGER,
		orderCode: DataTypes.STRING,
		totalPrice: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: "Order",
	})
	return Order
}