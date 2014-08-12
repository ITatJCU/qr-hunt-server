var config;

switch (process.env.NODE_ENV) {

    case 'testing':
        config = require('./testing.json');
        break;
    case 'production':
        config = require('./production.json');
        break;
    case 'development':
    default:
        config = require('./development.json');
}

config.database.force = (config.database.force) ? config.database.force : false;


module.exports = config;