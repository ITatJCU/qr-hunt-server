var Sequelize = require('sequelize');
var config = require('../../config');

// initialize database connection
var sequelize = new Sequelize('database', config.database.username, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    storage: process.cwd() + "/" + config.database.storage
});

// load models
var models = [
    'Player'
];
models.forEach(function (model) {
    module.exports[model] = sequelize.import('./models/' + model);
});

// describe relationships
(function (m) {

})(module.exports);

sequelize
    .sync({ force: config.force })
    .complete(function (err) {
        if (!!err) {
            console.log('An error occurred while creating the table:' + err);
        } else {
            console.log('ORM Tables created successfully.');
        }
    });
//Ensure database connectivity
sequelize.authenticate();
module.exports.sequelize = sequelize;