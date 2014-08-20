var restify = require('restify');
var uuid = require('node-uuid');

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
            '/players/999999',
            function (err, req, res, data) {
                test.equals(res.statusCode, 404);
                test.equals(err.body, 'Player not found');
                test.done();
            });
    },
    testCreatePlayer: function (test) {
        var playerId = uuid.v4();
        createClient().put(
            '/players',
            {
                uuid: playerId
            },
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    test.equals(res.statusCode, 201);
                    test.ok(data instanceof Object);
                    test.equals(data.uuid, playerId);
                    test.done();
                }
            });
    },
    testCreateAndRetrievePlayer: function (test) {
        var playerId = uuid.v4();

        createClient().put(
            '/players',
            {
                uuid: playerId,
                alias: 'Hoxton'
            },
            function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                } else {
                    createClient().get('/players/' + playerId, function (err, req, res, data) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            test.equals(res.statusCode, 200);
                            test.ok(data instanceof Object);
                            test.equals(data.alias, 'Hoxton');
                            test.equals(data.uuid, playerId);

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

    testAddCodes: function (test) {
        var playerId = uuid.v4();

        createClient().put(
            '/players',
            { uuid: playerId },
            function (err, req, res, data) {
                test.ok(!err);
                createClient().put('/codes',
                    {
                        title: 'New Game Code',
                        gameIndex: 999999,
                        content: 'Locale'
                    },
                    function (err, req, res, data) {
                        test.ok(!err);

                        createClient().put('/players/' + playerId + '/' + data.id, {}, function (err, req, res, data) {
                            test.ok(!err);
                            test.equals(res.statusCode, 201);

                            createClient().get('/players/' + playerId, function (err, req, res, data) {
                                test.ok(!err);
                                test.ok(data.scans instanceof Array);
                                test.ok(data.scans.length > 0);

                                var scan = data.scans[data.scans.length - 1];
                                test.equals(scan.gameIndex, 999999);
                                test.equals(scan.title, 'New Game Code');
                                test.done();
                            })
                        });
                    });

            });
    },
    testFlagWinner: function (test) {
        var playerId = uuid.v4();

        createClient().put(
            '/players',
            { uuid: playerId },
            function (err, req, res, data) {
                test.ok(!err);
                createClient().put(
                        '/players/' + playerId + '/win',
                    null,
                    function (err, req, res, data) {
                        test.ok(!err);

                        test.equals(data.previousWinner, true);

                        createClient().put(
                                '/players/' + playerId + '/oops',
                            null,
                            function (err, req, res, data) {
                                test.ok(!err);

                                test.equals(data.previousWinner, false);
                                test.done();
                            });
                    });

            });
    }
};