var Restify = require('restify');
var Util = require('util');

var server = Restify.createServer();
server.use(Restify.bodyParser()); //Parse body content of message sent to the server

module.exports = server;