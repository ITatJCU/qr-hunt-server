var models = require('../../lib/dao/models.js');
var Player = models.Player;
var Code = models.Code;

var uuid = require('node-uuid');

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
            uuid: uuid.v4()
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
            {uuid: uuid.v4(), alias: 'PlayerOne'},
            {uuid: uuid.v4(), alias: 'PlayerTwo'},
            {uuid: uuid.v4(), alias: 'PlayerThree'}
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


        var dataSet = [
            {uuid: uuid.v4(), alias: 'Alex'},
            {uuid: uuid.v4(), alias: 'Tim'},
            {uuid: uuid.v4(), alias: 'Mindi'}
        ];

        var i = 0;
        var insertFunction = function () {
            if (i < dataSet.length) {
                dao.create(dataSet[i], insertFunction);
            } else {
                dao.all(function (players, err) {
                    test.equals(players.length, 3);

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
    },

    testWinners: function (test) {
        var userId = uuid.v4();

        var dao = new DAO(sequelize, Player);

        dao.create({uuid: userId, alias: 'Player'}, function (player, err) {
            dao.setWinner(player.uuid, function (p, e) {
                test.equals(p.previousWinner, true);
                test.equals(p.uuid, userId);
                dao.removeWinner(player.uuid,function(p,e){
                    test.equals(p.previousWinner, false);
                    test.equals(p.uuid, userId);
                    test.done();
                })
            })
        })
    }
};