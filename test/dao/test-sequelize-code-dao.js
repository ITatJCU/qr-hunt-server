var models = require('../../lib/dao/models.js');
var Code = models.Code;

var DAO = require('../../lib/dao/sequelize-code-dao');


module.exports = {
    setUp: function (callback) {

        //Reset the database table for each test
        Code.sync({force: true}).complete(function () {
            callback();
        });
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testConstructor: function (test) {
        var dao = new DAO(Code);
        test.equals(Code, dao.modelDefinition());
        test.done();
    },
    testCreate: function (test) {
        var dao = new DAO(Code);

        var qr = {
            title: 'IT@JCU Central Display',
            content: 'Need we say more?',
            locationX: 123.12,
            locationY: 321.23,
            gameIndex: 0
        };

        dao.create(qr, function (result, err) {
            test.ok(result, 'Code not created or returned. Database Error.' + err);

            if (result) {
                test.equals(qr.title, result.title);
                test.equals(qr.content, result.content);
                test.equals(qr.locationX, result.locationX);
                test.equals(qr.locationY, result.locationY);
                test.equals(qr.gameIndex, result.gameIndex);
            }

            test.done();
        });

    }
};