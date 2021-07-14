
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
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    const config = {
        tablename: 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, columns, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: 'categoryProduct',
            foreignKey: 'category_id'
        })
    }    
    return Category;
}