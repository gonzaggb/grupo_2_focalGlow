module.exports = (sequelize, DataTypes) => {
    const alias = 'Images'
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
    return Image;
}