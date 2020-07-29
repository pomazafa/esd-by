const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const CategoryDoc = sequelize.define('CategoryDoc', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
        path: { type: Sequelize.STRING, allowNull: false }
     }, {
        sequelize,
        modelName: 'CategoryDoc',
        tableName: 'CategoryDocs',
        timestamps: false
    });
    return CategoryDoc;
}