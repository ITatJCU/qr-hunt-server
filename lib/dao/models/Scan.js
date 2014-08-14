/**
 * Core QR Code Scanned Data Structure
 * @param sequelize Initialised Sequelize ORM module reference
 * @param DataTypes Available DataTypes (const)
 * @returns {Sequelize.define}
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Scan', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        playerId: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            allowNull: false
        },
        codeId: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
};