module.exports = function (server) {

    /**
     * Gets the player with the specified uuid
     * Note: Player UUID must be sent to distinguish.
     */
    server.get('/players/:id', function (req, res, next) {

        server.dao.playerDAO().findById(req.params.id, function (player, err) {
            if (err) {
                res.send(500, 'Database Error: ' + err);
            } else if (player) {
                res.send(200, player);
            } else {
                res.send(404, 'Player not found');
            }
            return next();
        });
    });
    server.put('/players/:id', function (req, res, next) {
        var existingPlayer = req.params;

        server.dao.playerDAO().save(existingPlayer, function (player, err) {
            if (err) {
                res.send(500, 'Database Error: ' + err);
            } else if (player) {
                res.send(200, player);
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
            } else {
                res.send(500, 'Database Error: ' + err);
            }
            return next();
        });
    });

    server.put('/players/:playerId/:codeId', function (req, res, next) {

        server.dao.playerDAO().addScan(req.params.playerId, req.params.codeId, function (result, err) {
            if (!err) {
                res.send(201, result);
            } else {
                res.send(500, 'Database Error: ' + err);
            }
            return next();
        });
    });


};
