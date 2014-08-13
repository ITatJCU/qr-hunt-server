module.exports = function (server) {

    /**
     * Gets all available QR Codes from the database
     */
    server.get('/codes', function (req, res, next) {

        server.dao.codeDAO().all(function (results, err) {
            if (!err) {
                res.send(200, results);
            } else {
                res.send(500, 'Database Error Detected');
            }
            return next();
        });

    });

    /**
     * Gets all available QR Codes from the database
     */
    server.get('/gameCodes', function (req, res, next) {

        server.dao.codeDAO().allGameCodes(function (results, err) {
            if (!err) {
                res.send(200, results);
            } else {
                res.send(500, 'Database Error Detected');
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

        if (code.title && code.title != '') {
            server.dao.codeDAO().create(code, function (result, err) {
                if (!err) {
                    res.send(201, result);
                } else {
                    res.send(500, 'Database Error Detected');
                }
                return next();
            });
        } else {
            res.send(400, 'Invalid QR Code');
            return next();
        }

    });
};