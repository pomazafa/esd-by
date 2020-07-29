const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const Category = sequelize.define('Category', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
     }, {
        sequelize,
        modelName: 'Category',
        tableName: 'Categories',
        timestamps: false
    });
    return Category;
}