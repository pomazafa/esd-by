const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const Photo = sequelize.define('Photo', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        photoURL: { type: Sequelize.STRING, allowNull: false},
        photoDescription: { type: Sequelize.STRING, allowNull: true }
    }, {
        sequelize,
        modelName: 'Photo',
        tableName: 'Photos',
        timestamps: false,
    });
    return Photo;
}