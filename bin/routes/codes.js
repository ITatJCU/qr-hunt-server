var LogEventDispatcher = require('../../lib/utilities/log-event-dispatcher');

module.exports = function (server) {

    var lastCache = new Date(); //Initial cache time
    var cacheTime = 300000; // Cache codes for 5 minutes

    var forceReload = false;

    var updateCache = function (results) {
        server.cache['codes'] = results;
        lastCache = new Date();
        LogEventDispatcher.log('Updating Codes Cache.');
    };

    var getCache = function () {
        if (!server.cache['codes']) {
            server.cache['codes'] = [];
        }
        return server.cache['codes'];
    };

    var needsUpdate = function () {
        var now = new Date();
        return forceReload || (now.getTime() - lastCache.getTime()) > cacheTime;
    };

    /**
     * Gets all available QR Codes from the database
     */
    server.get('/codes', function (req, res, next) {
        if (needsUpdate() || getCache().length == 0) {
            server.dao.codeDAO().all(function (results, err) {
                if (!err) {
                    updateCache(results);
                    res.send(200, results);
                } else {
                    res.send(500, 'Database Error: ' + err);
                }
                return next();
            });
        }
        else {
            res.send(200, getCache());
            return next();
        }

    });

    /**
     * Gets all available QR Codes from the database
     */
    server.get('/gameCodes', function (req, res, next) {

        server.dao.codeDAO().allGameCodes(function (results, err) {
            if (!err) {
                res.send(200, results);
            } else {
                res.send(500, 'Database Error: ' + err);
            }
            return next();
        });

    });

    server.del('/codes/:id', function (req, res, next) {
        server.dao.codeDAO().remove(req.params.id, function (err) {
            if (err) {
                res.send(500, 'Database Error: ' + err);
            } else {
                res.send(200, null);
                forceReload = true;
            }
            return next();
        });
    });

    /**
     * Adds a QR Code to the database
     */
    server.put('/codes', function (req, res, next) {
        //Validate minimum requirements

        var code = req.params;

        if (code.id && code.title && code.title != "") {
            server.dao.codeDAO().save(code, function (result, err) {
                if (!err) {
                    res.send(201, result);
                    forceReload = true;
                } else {
                    res.send(500, 'Database Error: ' + err);
                }
                return next();
            });
        } else if (code.title && code.title != '') {
            server.dao.codeDAO().create(code, function (result, err) {
                if (!err) {
                    res.send(201, result);
                    forceReload = true;
                } else {
                    res.send(500, 'Database Error: ' + err);
                }
                return next();
            });
        } else {
            res.send(400, 'Invalid QR Code');
            return next();
        }

    });

};