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
    }, testInvalidAddCode: function (test) {

        createClient().put(
            '/codes',
            {
                notARealField: 'Should not be added',
                someName: 'is Irrelevant',
                someNumber: 123
            },
            function (err, req, res, data) {
                test.equals(res.statusCode, 400);
                test.equals(err.body, 'Invalid QR Code');
                test.done();
            });
    }, testAllCodesAgain: function (test) {

        createClient().put(
            '/codes',
            { title: 'Here is a code to find' },
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    createClient().get('/codes', function (err, req, res, data) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            test.equals(res.statusCode, 200);
                            test.ok(data instanceof Array);
                            test.ok(data.length >= 1);
                            test.equals(data[data.length - 1].title, 'Here is a code to find');
                            test.done();
                        }
                    });
                }
            });

    },
};