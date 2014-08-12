var Util = require("util");
var PlayerDAO = require("./player-dao");

/**
 * Sequelize Player Data Access Object
 *
 *
 * @class SequelizePlayerDAO
 * @param {SequelizeModel} player Sequelize Player Model Definition.
 * @constructor
 */

var _playerModel = null;
function SequelizePlayerDAO(player) {
    _playerModel = player;
}
Util.inherits(SequelizePlayerDAO, PlayerDAO);

/**
 * Gets the current SequelizeModel definition
 * @returns {null|SequelizeModel} Current model definition
 */
PlayerDAO.prototype.modelDefinition = function () {
    return _playerModel;
};

PlayerDAO.prototype.all = function (callback) {
    _playerModel.all().complete(function (err, players) {
        if (callback) {
            callback(players, err);
        }
    });
};

PlayerDAO.prototype.count = function (callback) {
    _playerModel.count().complete(function (err, result) {
        if (callback) {
            callback(result, err);
        }
    });
};

PlayerDAO.prototype.findById = function (uuid, callback) {
    _playerModel.find(uuid).complete(function (err, player) {
        if (callback) {
            callback(player, err);
        }
    });
};

PlayerDAO.prototype.create = function (player, callback) {
    _playerModel.findOrCreate({uuid: player.uuid}, player).complete(function (err, result) {
        if (callback) {
            callback(result, err);
        }
    });
};

PlayerDAO.prototype.remove = function (uuid) {
    throw new Error("Method Not Implemented");
};

PlayerDAO.prototype.save = function (player) {
    throw new Error("Method Not Implemented");
};

module.exports = SequelizePlayerDAO;