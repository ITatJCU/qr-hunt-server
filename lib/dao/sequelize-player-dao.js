var Util = require("util");
var PlayerDAO = require("./player-dao");

/**
 * Sequelize Code Data Access Object
 *
 *
 * @class SequelizeCodeDAO
 * @param {SequelizeModel} player Sequelize Code Model Definition.
 * @constructor
 * @extends PlayerDAO
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
SequelizePlayerDAO.prototype.modelDefinition = function () {
    return _playerModel;
};

SequelizePlayerDAO.prototype.all = function (callback) {
    _playerModel.all().complete(function (err, players) {
        if (callback) {
            callback(players, err);
        }
    });
};

SequelizePlayerDAO.prototype.count = function (callback) {
    _playerModel.count().complete(function (err, result) {
        if (callback) {
            callback(result, err);
        }
    });
};

SequelizePlayerDAO.prototype.findById = function (uuid, callback) {
    _playerModel.find(uuid).complete(function (err, player) {
        if (callback) {
            callback(player, err);
        }
    });
};

SequelizePlayerDAO.prototype.create = function (player, callback) {
    _playerModel.findOrCreate({uuid: player.uuid}, player).complete(function (err, result) {
        if (callback) {
            callback(result, err);
        }
    });
};

SequelizePlayerDAO.prototype.remove = function (uuid, callback) {
    _playerModel.destroy(uuid).complete(function (err) {
        if (callback) {
            callback(err);
        }
    })
};

SequelizePlayerDAO.prototype.save = function (player, callback) {
    _playerModel.find(player.uuid).complete(function (err, res) {
        if (!err) {
            res.updateAttributes(player).complete(function (e) {
                if (callback) {
                    callback(res, e);
                }
            })
        } else if (callback) {
            callback(player, err);
        }
    });
};

SequelizePlayerDAO.prototype.reset = function (uuid, callback) {
    _playerModel.find(uuid).complete(function (err, res) {
        if (!err) {
            res.resetAt = new Date();
            res.save().complete(function (e) {
                if (callback) {
                    callback(res, e);
                }
            })
        } else if (callback) {
            callback(null, err);
        }
    })
};

module.exports = SequelizePlayerDAO;