var models = require('../../lib/dao/models.js');
var Player = models.Player;
var sequelize = models.sequelize;

var playerAlias = '';
var fingerprint = 1446914009;

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

        var p = Player.build({
            uuid: 1446914010,
            alias: 'Alex'
        });

        p.save().complete(function (err) {
            if (!!err) {
                test.ok(false, err);
            } else {
                test.ok(true);
            }
            test.done();
        });
    }
};
