var Util = require("util");
var CodeDAO = require("./code-dao");

/**
 * Sequelize QR Code Data Access Object
 *
 *
 * @class SequelizeCodeDAO
 * @param {SequelizeModel} code Sequelize Code Model Definition.
 * @constructor
 */

var _codeModel = null;
function SequelizeCodeDAO(code) {
    _codeModel = code;
}
Util.inherits(SequelizeCodeDAO, CodeDAO);

/**
 * Gets the current SequelizeModel definition
 * @returns {null|SequelizeModel} Current model definition
 */
SequelizeCodeDAO.prototype.modelDefinition = function () {
    return _codeModel;
};

SequelizeCodeDAO.prototype.all = function (callback) {
    throw new Error("Method Not Implemented");
};

SequelizeCodeDAO.prototype.allGameCodes = function (callback) {
    throw new Error("Method Not Implemented");
};

SequelizeCodeDAO.prototype.findById = function (id, callback) {
    throw new Error("Method Not Implemented");
};

SequelizeCodeDAO.prototype.create = function (code, callback) {
    throw new Error("Method Not Implemented");
};

SequelizeCodeDAO.prototype.remove = function (id, callback) {
    throw new Error("Method Not Implemented");
};

SequelizeCodeDAO.prototype.save = function (code, callback) {
    throw new Error("Method Not Implemented");
};


module.exports = SequelizeCodeDAO;