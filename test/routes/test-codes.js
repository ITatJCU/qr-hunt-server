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
    testAllCodes: function (test) {

        createClient().get('/codes', function (err, req, res, data) {
            if (err) {
                throw new Error(err);
            } else {
                test.equals(res.statusCode, 200);
                test.ok(data instanceof Array);
                test.done();
            }
        });
    },
    testValidAddCode: function (test) {

        createClient().put(
            '/codes',
            { title: 'Test QR-Code' },
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    test.equals(res.statusCode, 201);
                    test.ok(data instanceof Object);
                    test.equals(data.title, 'Test QR-Code');
                    test.done();
                }
            });
    }
};