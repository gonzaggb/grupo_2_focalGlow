
module.exports = (sequelize, DataTypes) => {
    const alias = 'File'
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
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    const config = {
        tablename: 'files',
        timestamps: false,
        underscored: true
    }
    const Files = sequelize.define(alias, columns, config);

    Files.associate = function (models) {
        Files.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
    }
    return Files;
}