module.exports = (sequelize, DataTypes) => {
	const alias = 'Order'
	const columns = {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		orderNumber: {
			type: DataTypes.INTEGER,
			allowNull: true,
			unique: true
		},
		total: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}
	const config = {
		tablename: 'orders',
		timestamps: false,
		underscored: true
	}
	const Order = sequelize.define(alias, columns, config);
	Order.associate = function (model) {
		Order.belongsTo(model.User,
			{
				as: 'user',
				foreignKey: 'userId'
			})
		Order.hasMany(model.Item,
			{
				as: 'items',
				foreignKey: 'orderId'
			})

	}
	return Order;
}