const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    const Program = sequelize.define('Program', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING(2048), allowNull: true },
        descriptionShort: { type: Sequelize.STRING, allowNull: true },
        publishDate: { type: Sequelize.DATE, allowNull: false }
    }, {
        sequelize,
        modelName: 'Program',
        tableName: 'Programs',
        timestamps: false
    });
    return Program;
}