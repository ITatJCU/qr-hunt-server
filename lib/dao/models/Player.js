/**
 * Core Player Structure
 * @param sequelize Initialised Sequelize ORM module reference
 * @param DataTypes Available DataTypes (const)
 * @returns {Sequelize.define}
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Player', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        alias: {
            type: DataTypes.STRING(64),
            unique: false,
            allowNull: true
        },
        resetAt: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        previousWinner: {
            type: DataTypes.BOOLEAN,
            unique: false,
            allowNull: true,
            defaultValue: false
        }
    });
};