module.exports = function (server) {

    /**
     * Gets all available QR Codes from the database
     */
    server.get('/', function (req, res, next) {

        res.send(200, 'Welcome!');

        return next();
    })
};