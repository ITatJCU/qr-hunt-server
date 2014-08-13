module.exports = function (server) {

    /**
     * Gets all available QR Codes from the database
     */
    server.get('/codes', function (req, res, next) {

        server.dao.codeDAO.all(function (results, err) {
            if (!err) {
                res.send(200, results);
            } else {
                res.send(500, 'Database Error Detected.');
            }
        })

    })
};