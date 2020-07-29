const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const Сategory = sequelize.define('Сategory', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
     }, {
        sequelize,
        modelName: 'Сategory',
        tableName: 'Сategories',
        timestamps: false
    });
    return Сategory;
}