var config;
switch (process.env.NODE_ENV) {

    case 'production':
        config = require('./production.json');
        break;

    default:
        config = require('./development.json');
}

module.exports = config;