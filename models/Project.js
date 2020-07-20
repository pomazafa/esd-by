const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const Project = sequelize.define('Project', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        publishDate: { type: Sequelize.DATE, allowNull: false },
        photoURL: { type: Sequelize.STRING, allowNull: false, unique: true },
        photoDescription: { type: Sequelize.STRING, allowNull: true },
        title: { type: Sequelize.STRING, allowNull: false },
        messageShort: { type: Sequelize.STRING, allowNull: true },
        messageShort: { type: Sequelize.STRING, allowNull: true }
    }, {
        sequelize,
        modelName: 'Project',
        tableName: 'Projects',
        timestamps: false
    });
    return Project;
}