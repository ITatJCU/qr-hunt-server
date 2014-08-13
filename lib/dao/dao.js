var Util = require('util');
var DAOFactory = require('./dao-factory');
var Objects = require('../utilities/objects');

/**
 * Strategy based DAO Factory Class
 *
 * @class DAO
 * @constructor
 * @extends DAOFactory
 */
function DAO() {
    this._factory = null;
}

Util.inherits(DAO, DAOFactory);

/**
 * Gets a Player DAO instance
 *
 * @method playerDAO
 * @return {PlayerDAO} PlayerDAO Factory Instance
 */
DAO.prototype.playerDAO = function () {
    if (!this._factory) {
        throw new Error("Invalid DAO Factory set.");
    }
    return this._factory.playerDAO();
};

/**
 * Gets a Code DAO instance
 *
 * @method codeDAO
 * @return {CodeDAO} CodeDAO Factory Instance
 */
DAO.prototype.codeDAO = function () {
    if (!this._factory) {
        throw new Error("Invalid DAO Factory set.");
    }
    return this._factory.codeDAO();
};

/**
 * Sets the DAO Factory
 *
 * @method setFactory
 * @param {DAOFactory} factory DAO Factory instence to set
 */
DAO.prototype.setFactory = function (factory) {
    if (!Objects.IsPrototypeOf(factory, DAOFactory)) {
        throw new Error("Invalid DAO Factory.");
    }
    this._factory = factory;
};

/**
 * Gets the strategy formatting implementation
 *
 * @method factory
 * @returns {DAOFactory} Current DAO Factory in use
 */
DAO.prototype.factory = function () {
    return this._factory;
};

module.exports = DAO;
