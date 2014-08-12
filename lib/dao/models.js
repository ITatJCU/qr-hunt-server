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
    'Player', 'Code', 'Scan'
];

models.forEach(function (model) {
    module.exports[model] = sequelize.import('./models/' + model);
});

// describe relationships
(function (m) {
    m.Player.hasMany(m.Code, {through: m.Scan});
    m.Code.hasMany(m.Player, {through: m.Scan});
})(module.exports);

config.force = (config.force) ? config.force : false;

sequelize
    .sync({ force: config.database.force })
    .complete(function (err) {
        if (!!err) {
            console.log('An error occurred while creating the table:' + err);
        } else {
            console.log('ORM Tables created successfully.');
        }
    });

sequelize.authenticate();
module.exports.sequelize = sequelize;