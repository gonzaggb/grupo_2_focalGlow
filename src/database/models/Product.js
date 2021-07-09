
module.exports = (sequelize, DataTypes) => {
    const alias = 'Product'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tablename: 'products',
        timestamps: false
    }
    const Product = sequelize.define(alias, columns, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: 'categoryes',
            foreignKey: 'category_id'
        });
        /*Product.belongsToMany(models.Feature, {
            as: 'features',
            through: 'product_feature',
            foreignKey: 'product_id',
            otherKey: 'feature_id',
            timestamps: false
        })*/;

    }

    return Product;
}