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

    }, testCreateGameCode: function (test) {

        createClient().put(
            '/codes',
            {
                title: 'Game Code 1',
                gameIndex: 1,
                locationX: 12.50,
                locationY: 7.25,
                content: 'Main IT Display'
            },
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    createClient().get('/gameCodes', function (err, req, res, data) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            test.equals(res.statusCode, 200);
                            test.ok(data instanceof Array);
                            test.ok(data.length >= 1);

                            var index = data.length - 1;

                            test.equals(data[index].title, 'Game Code 1');
                            test.equals(data[index].gameIndex, 1);
                            test.equals(data[index].locationX, 12.5);
                            test.equals(data[index].locationY, 7.25);
                            test.equals(data[index].content, 'Main IT Display');

                            test.done();
                        }
                    });
                }
            });

    },
};