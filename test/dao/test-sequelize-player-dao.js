var models = require('../../lib/dao/models.js');
var Player = models.Player;
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
        var dao = new DAO(Player);
        test.equals(Player, dao.modelDefinition());
        test.done();
    },
    testCreate: function (test) {
        var somePlayer = {
            alias: 'John Doe',
            uuid: 3307827260
        };

        var dao = new DAO(Player);
        dao.create(somePlayer, function (result, err) {
            test.ok(result, 'Player not created or returned. Database Error.' + err);

            if (result) {
                test.equals(somePlayer.alias, result.alias);
                test.equals(somePlayer.uuid, result.uuid);
            }

            test.done();
        });
    },
    testCount: function (test) {
        var dao = new DAO(Player);

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
        var dao = new DAO(Player);

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

        var dao = new DAO(Player);

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
                    test.done();
                });
            }
            i++;
        };

        insertFunction();
    }
};