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

        test.done();
    }
};