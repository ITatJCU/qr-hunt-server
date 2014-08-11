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

module.exports = config;