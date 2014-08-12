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
    }
};