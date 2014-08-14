var config;

switch (process.env.NODE_ENV) {

    case 'testing':
        config = require('./testing.json');
        break;
    case 'development':
        config = require('./development.json');
        break;
    case 'production':
    default:
        config = require('./production.json');
}

config.database.force = (config.database.force) ? config.database.force : false;


module.exports = config;