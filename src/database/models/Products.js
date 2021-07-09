
module.exports = (sequelize, DataTypes) => {
    const alias = 'Products'
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
            type : DataTypes.STRING,
            allowNull : false
        },
        category_id: {
            type: DataTypes.INTEGER
        }
    }
    const config ={
        tablename : 'products',
        timestamps : false
    }
    const Product = sequelize.define(alias, columns, config);
    return Product;
}    