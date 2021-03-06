module.exports = (sequelize, DataTypes) => {
    const alias = 'Image'
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
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tablename: 'images',
        timestamps: false,
        underscored: true
    }
    const Image = sequelize.define(alias, columns, config);
    Image.associate = function (models) {
        Image.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });
    }
    return Image;
}