module.exports = (sequelize, DataTypes) => {
    const alias = 'Image'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tablename: 'images',
        timestamps: false
    }
    const Image = sequelize.define(alias, columns, config);
    Image.associate = function (models) {
        Image.belongsTo(models.Product, {
            as: 'images',
            foreignKey: 'product_id'
        });
    }
    return Image;
}