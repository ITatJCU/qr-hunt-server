var FS = require('fs');
var config = require('../config');
var server = require('../config/restify');
server.io = require('../config/socketio')(server);

var DAO = require('../lib/dao/dao');
var SequelizeDAO = require('../lib/dao/sequelize-dao');

var dao = new DAO();
dao.setFactory(new SequelizeDAO());
server.dao = dao;

server.cache = [];

//Initialise the loggers
require('../config/loggers')(server);

var LogEventDispatcher = require('../lib/utilities/log-event-dispatcher');

function start(callback) {

    LogEventDispatcher.log('Initialising API Server...');
    server.listen(config.port, function (err) {
        if (!!err) {
            LogEventDispatcher.log('\tError initialising server:');
            LogEventDispatcher.log(err);
        } else {
            LogEventDispatcher.log('\t' + config.app.name + ' listening at ' + server.url);
            initialiseRoutes();
        }
        if (callback) {
            callback();
        }
    });
}

function initialiseRoutes() {
    LogEventDispatcher.log('Loading routes...');
    var routes = __dirname + '/routes';

    FS.readdirSync(routes).forEach(function (file) {
        LogEventDispatcher.log('\t' + file);
        require(routes + '/' + file)(server);
    });
}

module.exports.server = server;
module.exports.start = start;