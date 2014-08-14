var models = require('../../lib/dao/models.js');
var Player = models.Player;
var Code = models.Code;

var sequelize = models.sequelize;

var DAO = require('../../lib/dao/sequelize-player-dao');


module.exports = {
    setUp: function (callback) {

        //Reset the database table for each test
        Player.sync({force: true}).complete(function () {
            callback();
        });
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testConstructor: function (test) {
        var dao = new DAO(sequelize, Player);
        test.equals(Player, dao.modelDefinition());
        test.done();
    },
    testCreate: function (test) {
        var somePlayer = {
            alias: 'John Doe',
            uuid: 3307827260
        };

        var dao = new DAO(sequelize, Player);
        dao.create(somePlayer, function (result, err) {
            test.ok(result, 'Code not created or returned. Database Error.' + err);

            if (result) {
                test.equals(somePlayer.alias, result.alias);
                test.equals(somePlayer.uuid, result.uuid);
            }

            test.done();
        });
    },
    testCount: function (test) {
        var dao = new DAO(sequelize, Player);

        var players = [
            {uuid: 1, alias: 'PlayerOne'},
            {uuid: 2, alias: 'PlayerTwo'},
            {uuid: 3, alias: 'PlayerThree'}
        ];

        var i = 0;
        var insertFunction = function () {
            if (i < players.length) {
                dao.create(players[i], insertFunction);
            } else {
                dao.count(function (total, err) {
                    test.equals(total, 3);
                    test.done();
                });
            }
            i++;
        };

        insertFunction();

    },
    testAll: function (test) {
        var dao = new DAO(sequelize, Player);

        var players = [
            {uuid: 123456789, alias: 'Alex'},
            {uuid: 987654321, alias: 'Tim'},
            {uuid: 456789123, alias: 'Mindi'}
        ];

        var i = 0;
        var insertFunction = function () {
            if (i < players.length) {
                dao.create(players[i], insertFunction);
            } else {
                dao.all(function (players, err) {
                    test.equals(players.length, 3);

                    test.equals(players[0].alias, 'Alex');
                    test.equals(players[0].uuid, 123456789);

                    test.equals(players[1].alias, 'Mindi');
                    test.equals(players[1].uuid, 456789123);

                    test.equals(players[2].alias, 'Tim');
                    test.equals(players[2].uuid, 987654321);

                    test.done();
                });
            }
            i++;
        };

        insertFunction();
    },

    testFindById: function (test) {

        var dao = new DAO(sequelize, Player);

        var players = [
            {uuid: 123456, alias: 'Kitt'},
            {uuid: 987654321, alias: 'Tim'},
            {uuid: 456789123, alias: 'Mindi'}
        ];

        var i = 0;
        var insertFunction = function () {
            if (i < players.length) {
                dao.create(players[i], insertFunction);
            } else {
                dao.findById(123456, function (player, err) {
                    test.equals(player.alias, 'Kitt');
                    test.equals(player.uuid, 123456);
                    test.ok(player.dataValues.scans instanceof Array);
                    test.done();
                });
            }
            i++;
        };

        insertFunction();
    },
    testRemove: function (test) {
        var dao = new DAO(sequelize, Player);

        var players = [
            {uuid: 876, alias: 'HAL'},
            {uuid: 543, alias: 'KITT'},
            {uuid: 210, alias: 'KAR'}
        ];

        var i = 0;
        var insertFunction = function () {
            if (i < players.length) {
                dao.create(players[i], insertFunction);
            } else {
                dao.count(function (total, err) {
                    test.equals(total, 3);
                    dao.remove(876, function (err) {
                        test.ok(!!err, 'Error removing Player from storage.');
                        test.done();
                    })
                });
            }
            i++;
        };

        insertFunction();
    },

    testSave: function (test) {
        var dao = new DAO(sequelize, Player);

        dao.create({uuid: 1010, alias: 'Caff'}, function (player, err) {
            dao.save({uuid: 1010, alias: 'NotCaff'}, function (player, err) {
                test.ok(!err);
                test.equals(player.alias, 'NotCaff');
                test.equals(player.uuid, 1010);
                test.done();
            });
        });
    },

    testReset: function (test) {
        var dao = new DAO(sequelize, Player);

        dao.create({uuid: 100, alias: 'Player'}, function (player, err) {

            var current = player.resetAt;

            dao.reset(player.uuid, function (p, e) {
                test.equals(p.alias, 'Player');
                test.equals(p.uuid, 100);
                test.ok(current != p.resetAt);
                test.done();
            })
        })
    }
};