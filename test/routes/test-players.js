var restify = require('restify');

function createClient() {
    return restify.createJsonClient({
        version: '*',
        url: 'http://127.0.0.1:8082'
    });
}

module.exports = {
    setUp: function (callback) {
        require('../../bin/hunter').start(function () {
            callback();
        });
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testNoPlayerFound: function (test) {

        createClient().get(
            '/player/999999',
            function (err, req, res, data) {
                test.equals(res.statusCode, 404);
                test.equals(err.body, 'Player not found');
                test.done();
            });
    }
};