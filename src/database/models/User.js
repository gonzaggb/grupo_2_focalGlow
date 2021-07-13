
module.exports = (sequelize, DataTypes) => {
    const alias = 'User'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profileImg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user','admin'),
            allowNull: false
        },
    }
    const config = {
        tablename: 'users',
        timestamps: false,
        underscored: true
    }
    const Users = sequelize.define(alias, columns, config);
    return Users;
}