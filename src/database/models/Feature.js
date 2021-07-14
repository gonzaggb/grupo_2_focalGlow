
module.exports = (sequelize, DataTypes) => {
    const alias = 'Feature'
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
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
        },
    }
    const config = {
        tablename: 'features',
        timestamps: false
    }
    const Feature = sequelize.define(alias, columns, config);
    Feature.associate = function (models) {
        Feature.belongsToMany(models.Product, {
            as: 'products',
            through: 'product_feature',
            foreignKey: 'feature_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }
    return Feature;
}