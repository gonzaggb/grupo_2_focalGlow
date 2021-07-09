
module.exports = (sequelize, DataTypes) => {
    const alias = 'Features'
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
    Files.associate = function (models) {
        Files.belongsToMany(models.Product, {
            as: 'products',
            through :'product_feature',
            foreignKey: 'feature_id',
            otherKey:  'product_id',
            timestamps : false
        });
    }
    return Feature;
}