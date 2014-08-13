/**
 * Abstract DAO Factory Class
 *
 * @class DAOFactory
 * @constructor
 */
function DAOFactory() {
}

/**
 * Gets a Player DAO instance
 *
 * @method playerDAO
 * @return {PlayerDAO} PlayerDAO Factory Instance
 */
DAOFactory.prototype.playerDAO = function () {
    throw new Error("Method Not Implemented");
};

/**
 * Gets a Code DAO instance
 *
 * @method codeDAO
 * @return {CodeDAO} CodeDAO Factory Instance
 */
DAOFactory.prototype.codeDAO = function () {
    throw new Error("Method Not Implemented");
};

module.exports = DAOFactory;