var models = require('../../lib/dao/models.js');
var Player = models.Player;
var sequelize = models.sequelize;

var playerAlias = '';
var fingerprint = 1446914009;

module.exports = {
    setUp: function (callback) {
        Player.find(fingerprint)
            .failure(function (err) {
                Player.create({
                    name: playerAlias,
                    uuid: fingerprint
                }).success(function (player) {

                });
            });
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testInitialPlayerCreated: function (test) {
        Player.all().success(function (players) {
            test.equals(players.count, 1);
            test.equals(players[0].name, playerAlias);
            test.equals(players[0].uuid, fingerprint);
        }).failure(function (err) {
            test.ok(false, err);
        });
        test.done();
    },
    testCreate: function (test) {
        sequelize.transaction(function (t) {
            Player.create(
                { uuid: '1446914010', name: 'Alex' },
                { transaction: t }
            ).success(function () {
                    Player.all({ transaction: t })
                        .success(function (players) {
                            test.equals(players.count, 2);
                        }).failure(function (err) {
                            test.ok(false, err);
                        });
                })
        });
        test.done();
    }
};
