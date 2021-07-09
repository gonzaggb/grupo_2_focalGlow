
module.exports = (sequelize, DataTypes) => {
    const alias = 'File'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    const config = {
        tablename: 'files',
        timestamps: false
    }
    const Files = sequelize.define(alias, columns, config);
    return Files;
}