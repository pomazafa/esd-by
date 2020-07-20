const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const New = sequelize.define('New', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        newDate: { type: Sequelize.DATE, allowNull: false },
        title: { type: Sequelize.STRING, allowNull: false },
        messageShort: { type: Sequelize.STRING, allowNull: true },
        messageShort: { type: Sequelize.STRING, allowNull: true }
    }, {
        sequelize,
        modelName: 'New',
        tableName: 'News',
        timestamps: false
    });
    return New;
}