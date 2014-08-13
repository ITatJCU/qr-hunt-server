var restify = require('restify');

function createClient() {
    return restify.createJsonClient({
        version: '*',
        url: 'http://127.0.0.1:8082'
    });
};

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
    testIndex: function (test) {


        createClient().get('/codes', function (err, req, res, data) {
            if (err) {
                throw new Error(err);
            } else {
                test.equals(res.statusCode, 200);
                test.done();
            }
        });
    }
};