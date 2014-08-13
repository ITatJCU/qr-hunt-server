var Util = require('util');
var DAO = require('../../lib/dao/dao');

var DAOFactory = require('../../lib/dao/dao-factory');

function MockFactory() {

}

Util.inherits(MockFactory, DAOFactory);

MockFactory.prototype.playerDAO = function () {
    return 'PlayerDAO Impl';
};
MockFactory.prototype.codeDAO = function () {
    return 'CodeDAO Impl';
};

exports['testSetFactory'] = function (test) {
    var dao = new DAO();

    test.doesNotThrow(function () {
        dao.setFactory(new MockFactory());
    });

    test.done();
};

exports['testPlayerDAO'] = function (test) {
    var dao = new DAO();

    dao.setFactory(new MockFactory());
    test.equals(dao.playerDAO(), 'PlayerDAO Impl');

    test.done();
};

exports['testCodeDAO'] = function (test) {
    var dao = new DAO();

    dao.setFactory(new MockFactory());
    test.equals(dao.codeDAO(), 'CodeDAO Impl');

    test.done();
};
