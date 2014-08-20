var models = require('../../lib/dao/models.js');
var Player = models.Player;
var sequelize = models.sequelize;
var uuid = require('node-uuid');

var playerAlias = '';
var fingerprint = uuid.v4();

module.exports = {
    setUp: function (callback) {
        sequelize.authenticate()
            .complete(function () {
                Player.findOrCreate(fingerprint, {alias: playerAlias, uuid: fingerprint}).complete(function () {
                    callback();
                });
            });
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testCreate: function (test) {

        Player.findOrCreate(
            { uuid: fingerprint}, { alias: 'Alex' }
        ).complete(function (err, player) {
                test.equals(player.uuid, fingerprint);
                test.equals(player.alias, 'Alex');

                test.ok(!err);
                test.done();
            });
    }
};
