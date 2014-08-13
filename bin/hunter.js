var FS = require('fs');
var config = require('./config');
var server = require('./config/restify');
require('./config/loggers')(server);
var models = require('./src/dao/Models');

var LogEventDispatcher = require('./src/utilities/LogEventDispatcher');

function initialiseDatabase() {
    LogEventDispatcher.log('Initialising database...')

    models.sequelize
        .sync({ force: true })
        .complete(function (err) {
            if (!!err) {
                LogEventDispatcher.log('\tError initialising database:');
                LogEventDispatcher.log(err);
            } else {
                initialiseServer();
            }
        });
}

function initialiseServer() {
    LogEventDispatcher.log('Initialising API Server...');
    server.listen(config.application.port, function (err) {
        if (!!err) {
            LogEventDispatcher.log('\tError initialising server:');
            LogEventDispatcher.log(err);
        } else {
            LogEventDispatcher.log('\t' + server.name + ' listening at ' + server.url);
            initialiseRoutes();
        }
    });
}

function initialiseRoutes() {
    LogEventDispatcher.log('Loading routes...');
    var routes = __dirname + '/src/routes';

    FS.readdirSync(routes).forEach(function (file) {
        LogEventDispatcher.log('\t' + file);
        require(routes + '/' + file)(server);
    });
}

initialiseDatabase();