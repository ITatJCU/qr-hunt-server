var FS = require('fs');
var config = require('../config');
var server = require('../config/restify');

var DAO = require('../lib/dao/dao');
var SequelizeDAO = require('../lib/dao/sequelize-dao');

var dao = new DAO();
dao.setFactory(new SequelizeDAO());
server.dao = dao;

//Initialise the loggers
require('../config/loggers')(server);

var LogEventDispatcher = require('../lib/utilities/log-event-dispatcher');

function initialiseServer() {
    LogEventDispatcher.log('Initialising API Server...');
    server.listen(config.port, function (err) {
        if (!!err) {
            LogEventDispatcher.log('\tError initialising server:');
            LogEventDispatcher.log(err);
        } else {
            LogEventDispatcher.log('\t' + config.app.name + ' listening at ' + server.url);
            initialiseRoutes();
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

initialiseServer();