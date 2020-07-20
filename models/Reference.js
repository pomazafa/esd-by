const { Sequelize } = require('sequelize');

module.exports = function(sequelize) {
    const Reference = sequelize.define('Reference', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        ReferenceLink: { type: Sequelize.STRING, allowNull: false },
        ReferenceIndex: { type: Sequelize.INTEGER, allowNull: false},
        ReferenceLength: { type: Sequelize.INTEGER, allowNull: false}
    }, {
        sequelize,
        modelName: 'Reference',
        tableName: 'References',
        timestamps: false
    });
    return Reference;
}