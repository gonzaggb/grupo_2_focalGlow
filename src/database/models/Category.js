
module.exports = (sequelize, DataTypes) => {
    const alias = 'Category'
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
        imageCover: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageHome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    const config = {
        tablename: 'categories',
        timestamps: false,
        underscored: true
    }
    const Category = sequelize.define(alias, columns, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        })
    }
    return Category;
}