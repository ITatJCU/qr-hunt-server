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
                    test.equals(player.name, playerAlias);
                    test.equals(player.uuid, fingerprint);
                    callback();
                }).failure(function (err) {
                    test.ok(false, err);
                    callback();
                });
            }).success(function () {
                callback();
            });
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testCreate: function (test) {
        sequelize.transaction(function (t) {
            Player.create(
                { uuid: '1446914010', name: 'Alex' },
                { transaction: t }
            ).success(function () {
                    Player.all({ transaction: t })
                        .success(function (players) {
                            test.equals(players.length, 2);
                            test.done();
                        }).failure(function (err) {
                            test.ok(false, err);
                            test.done();
                        });
                }).failure(function (err) {
                    test.ok(false, err);
                    test.done();
                })
        });
    }
};
