var Restify = require('restify');
var Util = require('util');

var server = Restify.createServer();
server.use(Restify.bodyParser()); //Parse body content of message sent to the server


//setup cors
Restify.CORS.ALLOW_HEADERS.push('accept');
Restify.CORS.ALLOW_HEADERS.push('sid');
Restify.CORS.ALLOW_HEADERS.push('lang');
Restify.CORS.ALLOW_HEADERS.push('origin');
Restify.CORS.ALLOW_HEADERS.push('withcredentials');
Restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(Restify.CORS());

module.exports = server;