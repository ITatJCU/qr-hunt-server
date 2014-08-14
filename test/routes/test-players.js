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
    },
    testCreatePlayer: function (test) {
        createClient().put(
            '/players',
            {
                uuid: 1446914009
            },
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    test.equals(res.statusCode, 201);
                    test.ok(data instanceof Object);
                    test.equals(data.uuid, 1446914009);
                    test.done();
                }
            });
    },
    testCreateAndRetrievePlayer: function (test) {
        createClient().put(
            '/players',
            {
                uuid: 1446914010,
                alias: 'Hoxton'
            },
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    createClient().get('/player/1446914010', function (err, req, res, data) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            test.equals(res.statusCode, 200);
                            test.ok(data instanceof Object);
                            test.equals(data.alias, 'Hoxton');
                            test.equals(data.uuid, 1446914010);

                            test.done();
                        }
                    });
                }
            });
    },
    testAllPlayers: function (test) {
        createClient().get(
            '/players',
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    test.equals(res.statusCode, 200);
                    test.ok(data instanceof Array);
                    test.done();
                }
            });
    },

    testAddCode: function (test) {
        createClient().put(
            '/players',
            { uuid: 14469 },
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    createClient().put('/player/14469/12', function (err, req, res, data) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            test.equals(res.statusCode, 201);
                            test.done();
                        }
                    });
                }
            });
    }
};