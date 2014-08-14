module.exports = function (server) {
    /**
     * Gets all available QR Codes from the database
     */
    server.get('/leaderboard', function (req, res, next) {

        server.dao.playerDAO().leaderboard(function (results, err) {
            if (!err) {
                res.send(200, results);
            } else {
                res.send(500, 'Database Error: ' + err);
            }
            return next();
        });

    });


};