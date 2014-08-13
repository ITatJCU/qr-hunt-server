var FS = require('fs');
var config = require('../config');
var server = require('../config/restify');

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
    var routes = './lib/routes';

    FS.readdirSync(routes).forEach(function (file) {
        LogEventDispatcher.log('\t' + file);
        require(routes + '/' + file)(server);
    });
}

initialiseServer();