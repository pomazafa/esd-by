const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const Subcategory = sequelize.define('Subcategory', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
     }, {
        sequelize,
        modelName: 'Subcategory',
        tableName: 'Subcategories',
        timestamps: false
    });
    return Subcategory;
}