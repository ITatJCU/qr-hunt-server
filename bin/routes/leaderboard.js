var LogEventDispatcher = require('../../lib/utilities/log-event-dispatcher');

module.exports = function (server) {

    var lastCache = new Date(); //Initial cache time
    var cacheTime = 300000; // Cache codes for 5 minutes
    server.cache.updateLeaderbaord = true;

    var updateCache = function (results) {
        server.cache['leaderboard'] = results;
        lastCache = new Date();
        LogEventDispatcher.log('Updating Player leader board Cache.');
    };

    var getCache = function () {
        if (!server.cache['leaderboard']) {
            server.cache['leaderboard'] = [];
        }
        return server.cache['leaderboard'];
    };

    var needsUpdate = function () {
        var now = new Date();
        return  server.cache.updateLeaderbaord || (now.getTime() - lastCache.getTime()) > cacheTime;
    };

    /**
     * Gets all available QR Codes from the database
     */
    server.get('/leaderboard', function (req, res, next) {

        if (needsUpdate()) {

            server.dao.playerDAO().leaderboard(function (results, err) {
                if (!err) {
                    res.send(200, results);
                    server.cache.updateLeaderbaord = false;
                    updateCache(results);
                } else {
                    res.send(500, 'Database Error: ' + err);
                }
                return next();
            });

        } else {
            res.send(200, getCache());
            return next();
        }

    });


};