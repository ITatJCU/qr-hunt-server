var models = require('../../lib/dao/models.js');
var Player = models.Player;
var sequelize = models.sequelize;

var DAO = require('../../lib/dao/sequelize-player-dao');


module.exports = {
    setUp: function (callback) {
        sequelize.authenticate()
            .complete(function () {
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

        dao.count(function (total, err) {
            //Tests are executed in order as written within each file (and assumed alphabetical by file name).
            //There should be at least one Player in the database from the 'testCreate' method above.

            test.ok(total >= 1, 'No records persist in the database. ' + err);
            test.done();
        });
    }
};