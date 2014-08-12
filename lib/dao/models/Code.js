/**
 * Core QR Code Data Structure
 * @param sequelize Initialised Sequelize ORM module reference
 * @param DataTypes Available DataTypes (const)
 * @returns {Sequelize.define}
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Code', {
        title: {
            type: DataTypes.STRING(64),
            unique: false,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false
        },
        locationX: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            unique: false
        },
        locationY: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            unique: false
        },
        gameIndex: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
            defaultValue: 0
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            unique: true
        }
    });
};