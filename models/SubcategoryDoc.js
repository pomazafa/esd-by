const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const SubcategoryDoc = sequelize.define('SubcategoryDoc', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
        path: { type: Sequelize.STRING, allowNull: false }
     }, {
        sequelize,
        modelName: 'SubcategoryDoc',
        tableName: 'SubcategoryDocs',
        timestamps: false
    });
    return SubcategoryDoc;
}