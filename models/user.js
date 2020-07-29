const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    const User = sequelize.define('User', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: true },
        password: { type: Sequelize.STRING, allowNull: false },
        passwordSalt: { type: Sequelize.STRING, allowNull: false },
        role: { type: Sequelize.INTEGER, allowNull: false, validate: { min: 0, max: 2 } }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false
    });
    return User;
}