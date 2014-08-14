var Sequelize = require('sequelize');
var config = require('../../config');
var LogEventDispatcher = require('../utilities/log-event-dispatcher');

// initialize database connection
var sequelize = new Sequelize('database', config.database.username, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    storage: process.cwd() + "/" + config.database.storage
});

// load models
var models = [
    'Player', 'Code', 'Scan'
];

models.forEach(function (model) {
    module.exports[model] = sequelize.import('./models/' + model);
});

// describe relationships
(function (m) {
    //Sequelize has an issue presently with Many-To-Many joins in tables and defining a custom composite key.
    //Specific queries will be written to overcome this
})(module.exports);


sequelize
    .sync({ force: config.database.force })
    .complete(function (err) {
        if (!!err) {
            LogEventDispatcher.log('An error occurred while creating the table:' + err);
        } else {
            LogEventDispatcher.log('ORM Tables created successfully.');
        }
    });

sequelize.authenticate();
module.exports.sequelize = sequelize;