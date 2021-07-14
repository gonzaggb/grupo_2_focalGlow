module.exports = (sequelize, DataTypes) => {
    const alias = 'Item'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        productName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        productPrice: {
            type: DataTypes.DECIMAL,
        },
        productDescription: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        productFeatures: {
            type: DataTypes.STRING(50)
        },
        productImage: {
            type: DataTypes.STRING(50)
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        subtotal: {
            type: DataTypes.DECIMAL
        },
        orderId: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER
        },
        productId: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tablename: 'items',
        timestamps: false,
        underscored: true

    }
    const Item = sequelize.define(alias, columns, config);
    Item.associate = function (model) {
        Item.belongsTo(model.User,
            {
                as: 'item',
                foreignKey: 'userId'
            })
        Item.hasMany(model.Order,
            {
                as: 'order',
                foreignKey: 'orderId'
            })

    }

    return Item;


}

