"use strict"
const {
	Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Detail_Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Detail_Order.belongsTo(models.Order, {as: "order", foreignKey: "orderId"})
			Detail_Order.belongsTo(models.Schedule, {as: "schedule", foreignKey: "scheduleId"})
		}
	}
	Detail_Order.init({
		orderId: DataTypes.INTEGER,
		scheduleId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: "Detail_Order",
	})
	return Detail_Order
}