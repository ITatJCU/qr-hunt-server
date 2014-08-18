var Util = require("util");
var PlayerDAO = require("./player-dao");
var Sequelize = require('sequelize');

/**
 * Sequelize Code Data Access Object
 *
 * @class SequelizeCodeDAO
 * @param {Sequelize} sequelize Initiated Sequelize Instance
 * @param {SequelizeModel} player Sequelize Code Model Definition.
 *
 * @constructor
 * @extends PlayerDAO
 */

var _playerModel = null;
var _sequelize = null;
function SequelizePlayerDAO(sequelize, player) {
    _playerModel = player;
    _sequelize = sequelize;
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

    _playerModel.find({ where: {uuid: uuid} })
        .complete(function (err, player) {

            if (player) {
                _sequelize.query(
                    Sequelize.Utils.format(
                        [
                            "SELECT playerId, codeId, Scans.createdAt, title, gameIndex FROM Scans LEFT JOIN Codes ON Scans.codeId = Codes.id WHERE gameIndex > 0 AND `playerId` = ? AND Scans.createdAt >= ? GROUP BY playerId, codeId ORDER BY Scans.createdAt DESC;",
                            player.uuid,
                            player.resetAt
                        ])
                ).complete(function (err, results) {

                        var scans = [];

                        if (results) {
                            scans = results;
                        }

                        player.dataValues.scans = scans;

                        if (callback) {
                            callback(player, err);
                        }
                    });
            }
            else if (callback) {
                callback(player, err);
            }
        });
};

SequelizePlayerDAO.prototype.create = function (player, callback) {
    _playerModel.findOrCreate(
        {uuid: player.uuid},
        player
    ).complete(function (err, result) {
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
    var self = this;
    _playerModel.find(uuid).complete(function (err, res) {
        if (!err) {
            res.resetAt = new Date();
            res.save().complete(function (e) {
                self.findById(uuid, callback);
            })
        } else if (callback) {
            callback(null, err);
        }
    })
};


SequelizePlayerDAO.prototype.addScan = function (uuid, scanId, callback) {
    var self = this;
    _playerModel.find({where: {uuid: uuid}})
        .complete(function (err, player) {

            _sequelize.query(
                Sequelize.Utils.format(
                    [
                        "INSERT INTO `Scans` (playerId, codeId, createdAt, updatedAt) values(?,?,?,?);",
                        uuid,
                        scanId,
                        new Date(),
                        new Date()
                    ])
            ).complete(function (err) {
                    self.findById(uuid, callback);
                });
        });
};

SequelizePlayerDAO.prototype.leaderboard = function (callback) {
    _sequelize.query(
            "SELECT playerId, alias, COUNT(*) as collected, MAX(createdAt) as lastCode,MIN(createdAt) as firstCode, strftime('%s',MAX(createdAt)) - strftime('%s',MIN(createdAt)) as duration " +
            "FROM " +
            "    (SELECT playerId, alias, codeId, Scans.createdAt, title, gameIndex " + "" +
            "     FROM Scans LEFT JOIN Codes ON Scans.codeId = Codes.id LEFT JOIN Players ON Scans.playerId = Players.uuid " +
            "     WHERE gameIndex > 0 GROUP BY playerId, codeId ORDER BY Scans.createdAt DESC) " +
            "GROUP BY playerId ORDER BY collected DESC, duration ASC;"
    ).complete(function (err, results) {
            if (callback) {
                callback(results, err);
            }
        });
};


module.exports = SequelizePlayerDAO;