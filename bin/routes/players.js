var LogEventDispatcher = require('../../lib/utilities/log-event-dispatcher');

module.exports = function (server) {

    server.cache['players'] = {};

    var updateCache = function (uuid, player) {
        player.lastCached = new Date();
        player.reload = false;
        server.cache['players'][uuid] = player;
        LogEventDispatcher.log('Updating Player Cache: ' + uuid);
    };

    var getCached = function (uuid) {
        return server.cache['players'][uuid];
    };

    var setReloadRequired = function (uuid) {
        var p = getCached(uuid);
        if (p) {
            p.reload = true;
            updateCache(p);
        }
    };

    var needsUpdate = function (uuid) {
        var p = getCached(uuid);
        if (p) {
            return p.reload;
        } else {
            return true;
        }
    };
    /**
     * Gets the player with the specified uuid
     * Note: Player UUID must be sent to distinguish.
     */
    server.get('/players/:id', function (req, res, next) {

        if (needsUpdate(req.params.id)) {

            server.dao.playerDAO().findById(req.params.id, function (player, err) {
                if (err) {
                    res.send(500, 'Database Error: ' + err);
                } else if (player) {
                    res.send(200, player);
                    updateCache(req.params.id, player);
                } else {
                    res.send(404, 'Player not found');
                }
                return next();
            });

        } else {
            res.send(200, getCached(req.params.id));
        }
    });

    server.put('/players/:id', function (req, res, next) {
        var existingPlayer = req.params;

        server.dao.playerDAO().save(existingPlayer, function (player, err) {
            if (err) {
                res.send(500, 'Database Error: ' + err);
            } else if (player) {
                setReloadRequired(player.uuid);
                res.send(200, player);
                server.cache.updateLeaderbaord = true; //Update on Alias update
            } else {
                res.send(404, 'Player not found');
            }
            return next();
        });
    });
    server.get('/players', function (req, res, next) {
        server.dao.playerDAO().all(function (players, err) {
            if (err) {
                res.send(500, 'Database Error: ' + err);
            } else {
                res.send(200, players);
            }
        });
    });

    server.put('/players', function (req, res, next) {
        //Validate minimum requirements

        var player = req.params;

        if (player.uuid && player.uuid != '') {
            server.dao.playerDAO().create(player, function (createdPlayer, err) {
                if (!err) {
                    res.send(201, createdPlayer);
                    setReloadRequired(result.uuid);
                } else {
                    res.send(500, 'Database Error: ' + err);
                }
                return next();
            });
        } else {
            res.send(400, 'No player UUID specified');
            return next();
        }
    });
    server.put('/players/:playerId/reset', function (req, res, next) {

        server.dao.playerDAO().reset(req.params.playerId, function (result, err) {
            if (!err) {
                res.send(201, result);
                setReloadRequired(result.uuid);
            } else {
                res.send(500, 'Database Error: ' + err);
            }
            return next();
        });
    });

    server.put('/players/:playerId/win', function (req, res, next) {

        server.dao.playerDAO().setWinner(req.params.playerId, function (result, err) {
            if (!err) {
                res.send(201, result);
                setReloadRequired(result.uuid);
            } else {
                res.send(500, 'Database Error: ' + err);
            }
            return next();
        });
    });

    server.put('/players/:playerId/oops', function (req, res, next) {

        server.dao.playerDAO().removeWinner(req.params.playerId, function (result, err) {
            if (!err) {
                res.send(201, result);
                setReloadRequired(result.uuid);
            } else {
                res.send(500, 'Database Error: ' + err);
            }
            return next();
        });
    });

    server.put('/players/:playerId/:codeId', function (req, res, next) {

        server.dao.playerDAO().addScan(req.params.playerId, req.params.codeId, function (result, err) {
            if (!err) {
                server.cache.updateLeaderbaord = true;
                res.send(201, result);

                if (server.io) {
                    server.io.sockets.emit('newScan', null);
                }
                setReloadRequired(result.uuid);
            } else {
                res.send(500, 'Database Error: ' + err);
            }
            return next();
        });
    });
};
