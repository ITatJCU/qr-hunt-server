/**
 * Abstract Player Data Access Object Class
 *
 * @class PlayerDAO
 * @constructor
 */
function PlayerDAO() {
}

/**
 * Persists an instance of a player back to the database
 *
 * @method findById
 * @param {number} uuid Player UUID to find
 * @returns {Object|null} Player object or null if not found
 */
PlayerDAO.prototype.all = function (uuid) {
    throw new Error("Method Not Implemented");
};

/**
 * Locates a player from the DAO using the UUID
 *
 * @method findById
 * @param {number} uuid Player UUID to find
 * @returns {Object|null} Player object or null if not found
 */
PlayerDAO.prototype.findById = function (uuid) {
    throw new Error("Method Not Implemented");
};

/**
 * Persists an instance of a player with the DAO
 *
 * @method create
 * @param {Object} player Player object to create
 * @returns {boolean} True if created successfully
 */
PlayerDAO.prototype.create = function (player) {
    throw new Error("Method Not Implemented");
};

/**
 * Removes an of a player back from the DAO
 *
 * @method remove
 * @param {number} uuid Player UUID to remove
 * @returns {boolean} True if removed successfully
 */
PlayerDAO.prototype.remove = function (uuid) {
    throw new Error("Method Not Implemented");
};

/**
 * Persists an instance of a player back to the DAO
 *
 * @method save
 * @param {Object} player Player object to save
 * @returns {boolean} True if saved successfully
 */
PlayerDAO.prototype.save = function (player) {
    throw new Error("Method Not Implemented");
};

module.exports = PlayerDAO;