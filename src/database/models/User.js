
module.exports = (sequelize, DataTypes) => {
	const alias = 'User'
	const columns = {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		firstName: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			unique: true,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		phone: {
			type: DataTypes.INTEGER(50),
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		profileImg: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.ENUM('user', 'admin'),
			allowNull: false
		},
	}
	const config = {
		tablename: 'users',
		timestamps: false,
		underscored: true
	}
	const User = sequelize.define(alias, columns, config);
	User.associate = function (model) {
		User.hasMany(model.Item,
			{
				as: 'items', //Un usuario tiene muchos items
				foreignKey: 'userId'

			})
		User.hasMany(model.Order,
			{
				as: 'orders', //Un usuario tiene muchas orders
				foreignKey: 'userId'

			})
	}
	return User;
}