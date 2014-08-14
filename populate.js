process.env.NODE_ENV = 'testing';

var hunter = require('./bin/hunter');

var codes = [
    {
        title: 'Building 17',
        gameIndex: 2
    },
    {
        title: 'Engieering',
        gameIndex: 3
    },
    {
        title: 'Medicine',
        gameIndex: 4
    },
    {
        title: 'Administration',
        gameIndex: 5
    },

];

function populate() {
    for (var i = 0; i < codes.length; i++) {
        hunter.server.dao.codeDAO().create(codes[i]);
    }
}


hunter.server.get('/players/:id', function (req, res, next) {
    var player = {
        uuid: req.params.id
    };
    hunter.server.dao.playerDAO().create(player, function (createdPlayer, err) {
        if (!err) {
            res.send(201, createdPlayer);
        } else {
            res.send(500, 'Database Error: ' + err);
        }
        return next();
    });
});

hunter.server.get('/players/:playerId/:codeId', function (req, res, next) {
    hunter.server.dao.playerDAO().addScan(req.params.playerId, req.params.codeId, function (result, err) {
        if (!err) {
            res.send(201, result);
        } else {
            res.send(500, 'Database Error: ' + err);
        }
        return next();
    });

});

hunter.start();
