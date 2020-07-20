const { Sequelize} = require('sequelize');

module.exports = function(sequelize) {
    const Event = sequelize.define('Event', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING(2048), allowNull: false },
        descriptionShort: { type: Sequelize.STRING, allowNull: true },
        publishDate: { type: Sequelize.DATE, allowNull: false },
    }, {
        sequelize,
        modelName: 'Event',
        tableName: 'Events',
        timestamps: false
    });
    return Event;
}