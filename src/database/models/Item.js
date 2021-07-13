
module.exports = (sequelize, DataTypes) => {
    const alias = 'Item'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productPrice: {
            type: DataTypes.DECIMAL,
        },
        productDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productFeatures: {
            type: DataTypes.STRING
        },
        productImages: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        subtotal: {
            type: DataTypes.DECIMAL
        },
        orderId: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tablename: 'products',
        timestamps: false
    }
    const Item = sequelize.define(alias, columns, config);

    return Item;


}

