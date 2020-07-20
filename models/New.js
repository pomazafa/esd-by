const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const New = sequelize.define('New', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        newDate: { type: Sequelize.DATE, allowNull: false },
        title: { type: Sequelize.STRING, allowNull: false },
        messageShort: { type: Sequelize.STRING, allowNull: true },
        message: { type: Sequelize.STRING(2048), allowNull: false },
        photoURL: { type: Sequelize.STRING, allowNull: true},
        photoDescription: { type: Sequelize.STRING, allowNull: true }
    }, {
        sequelize,
        modelName: 'New',
        tableName: 'News',
        timestamps: false
    });
    return New;
}