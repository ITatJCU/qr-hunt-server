var models = require('../../lib/dao/models.js');
var Code = models.Code;

var DAO = require('../../lib/dao/sequelize-code-dao');


var qrCodes = [
    {
        title: 'IT@JCU Main Display',
        content: 'Core of the Fun',
        locationX: 1.50,
        locationY: 1.50,
        gameIndex: 1
    },
    {
        title: 'Structural Engineering Display',
        content: 'Foundational Practice',
        locationX: 88.2,
        locationY: 1598.182,
        gameIndex: 2
    },
    {
        title: 'Creative Arts',
        content: 'Bringing a bit of flair'
    },
    {
        title: 'Mystery Prize',
        content: 'What could it be?',
        gameIndex: 3
    },
];

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
    },
    testAll: function (test) {
        var dao = new DAO(Code);

        var i = 0;
        var insertFunction = function () {
            if (i < qrCodes.length) {
                dao.create(qrCodes[i], insertFunction);
            } else {
                dao.all(function (codes, err) {

                    test.equals(codes.length, 4);

                    test.equals(codes[0].title, 'IT@JCU Main Display');
                    test.equals(codes[0].content, 'Core of the Fun');
                    test.equals(codes[0].locationX, 1.50);
                    test.equals(codes[0].locationY, 1.50);
                    test.equals(codes[0].gameIndex, 1);

                    test.equals(codes[1].title, 'Structural Engineering Display');
                    test.equals(codes[1].content, 'Foundational Practice');
                    test.equals(codes[1].locationX, 88.2);
                    test.equals(codes[1].locationY, 1598.182);
                    test.equals(codes[1].gameIndex, 2);

                    test.equals(codes[2].title, 'Creative Arts');
                    test.equals(codes[2].content, 'Bringing a bit of flair');
                    test.equals(codes[2].locationX, null);
                    test.equals(codes[2].locationY, null);
                    test.equals(codes[2].gameIndex, 0);

                    test.equals(codes[3].title, 'Mystery Prize');
                    test.equals(codes[3].content, 'What could it be?');
                    test.equals(codes[3].locationX, null);
                    test.equals(codes[3].locationY, null);
                    test.equals(codes[3].gameIndex, 3);

                    test.done();
                });
            }
            i++;
        };

        insertFunction();
    },

    testAllGameCodes: function (test) {
        var dao = new DAO(Code);

        var i = 0;
        var insertFunction = function () {
            if (i < qrCodes.length) {
                dao.create(qrCodes[i], insertFunction);
            } else {
                dao.allGameCodes(function (codes, err) {

                    test.equals(codes.length, 3);
                    test.equals(codes[0].title, 'IT@JCU Main Display');
                    test.equals(codes[1].title, 'Structural Engineering Display');
                    test.equals(codes[2].title, 'Mystery Prize');

                    test.done();
                });
            }
            i++;
        };

        insertFunction();
    },

    testFindById: function (test) {
        var dao = new DAO(Code);

        var i = 0;
        var id = null;
        var insertFunction = function (code) {
            if (!id && code) {
                id = code.id;
            }
            if (i < qrCodes.length) {
                dao.create(qrCodes[i], insertFunction);
            } else {
                dao.findById(id, function (qr, err) {
                    test.equals(qr.id, id);
                    test.ok(qr.title);
                    test.done();
                });
            }
            i++;
        };

        insertFunction();
    },

    testRemove: function (test) {
        var dao = new DAO(Code);

        var i = 0;
        var id = null;
        var insertFunction = function (code) {
            if (!id && code) {
                id = code.uuid;
            }
            if (i < qrCodes.length) {
                dao.create(qrCodes[i], insertFunction);
            } else {
                dao.remove(id, function (err) {
                    test.ok(!err);
                    test.done();
                });
            }
            i++;
        };
        insertFunction();
    },
    testSave: function (test) {
        var dao = new DAO(Code);

        var qr = {
            title: 'IT@JCU Central Display',
            content: 'Need we say more?',
            locationX: 123.12,
            locationY: 321.23,
            gameIndex: 0
        };

        dao.create(qr, function (code, err) {
            qr.id = code.id;

            qr.gameIndex = 23;
            qr.locationX = 0;

            dao.save(qr, function (c, e) {
                test.ok(!e);
                test.equals(c.gameIndex, 23);
                test.equals(c.locationX, 0);
                test.done();
            });
        });
    }
};