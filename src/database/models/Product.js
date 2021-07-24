
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
            foreignKey: 'category_id'
        })
        Product.hasMany(models.File, {
            as: 'files',
            foreignKey: 'product_id'
        })
        Product.hasMany(models.Image, {
            as: 'images',
            foreignKey: 'productId'
        })
        Product.belongsToMany(models.Feature, {
            as: 'features',
            through: 'product_feature',
            foreignKey: 'product_id',
            otherKey: 'feature_id',
            timestamps: false
        })

    }

    return Product;
}