module.exports = function (server) {

    /**
     * Gets the player with the specified uuid
     * Note: Player UUID must be sent to distinguish.
     */
    server.get('/player/:id', function (req, res, next) {

        server.dao.playerDAO().findById(req.params.id, function (player, err) {
            if (err) {
                res.send(500, 'Database Error Detected');
            } else if (player) {
                res.send(200, player);
            } else {
                res.send(404, 'Player not found');
            }
            return next();
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
                    res.send(500, 'Database Error Detected');
                }
                return next();
            });
        } else {
            res.send(400, 'No player UUID specified');
            return next();
        }
    });
};
