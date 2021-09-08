
module.exports = (sequelize, DataTypes) => {
    const alias = 'Product'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tablename: 'products',
        timestamps: false,
        underscored: true,
    }
    const Product = sequelize.define(alias, columns, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        })
        Product.hasMany(models.File, {
            as: 'files',
            foreignKey: 'productId'
        })
        Product.hasMany(models.Image, {
            as: 'images',
            foreignKey: 'productId'
        })
        Product.belongsToMany(models.Feature, {
            as: 'features',
            through: 'product_feature',
            foreignKey: 'productId',
            otherKey: 'featureId',
            timestamps: false
        })

    }

    return Product;
}