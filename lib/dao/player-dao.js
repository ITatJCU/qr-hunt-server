/**
 * Abstract Player Data Access Object Class
 *
 * @class PlayerDAO
 * @constructor
 */
function PlayerDAO() {
}

/**
 * Gets all tracked Players from the DAO
 *
 * @method all
 * @param {Function} [callback] Callback function
 * @param {number} callback.players All tracked players
 * @param {Object} callback.err Callback err or null
 */
PlayerDAO.prototype.all = function (callback) {
    throw new Error("Method Not Implemented");
};


/**
 * Counts the number of players presently tracked
 *
 * @method count
 * @param {Function} [callback] Callback function
 * @param {number} callback.result Total number of players
 * @param {Object} callback.err Callback err or null
 */
PlayerDAO.prototype.count = function (callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Locates a player from the DAO using the UUID
 *
 * @method findById
 * @param {number} uuid Player UUID to find
 * @param {Function} [callback] Callback function
 * @param {number} callback.player Found Player reference
 * @param {Object} callback.err Callback err or null
 */
PlayerDAO.prototype.findById = function (uuid, callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Persists an instance of a player with the DAO
 *
 * @method create
 * @param {Object} player Player object to create
 * @param {Function} [callback] Callback function
 * @param {Object} callback.player Created player object or null
 * @param {Object} callback.err Callback err or null
 */
PlayerDAO.prototype.create = function (player, callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Removes an instance of a code from the DAO
 *
 * @method remove
 * @param {number} uuid Player UUID to remove
 * @param {Function} [callback] Callback function
 * @param {Object} callback.err Callback err or null
 */
PlayerDAO.prototype.remove = function (uuid, callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Updates an instance of a player back to the DAO
 *
 * @method save
 * @param {Object} player Player object to save
 * @param {Function} [callback] Callback function
 * @param {Object} callback.player Updated player object
 * @param {Object} callback.err Callback err or null
 */
PlayerDAO.prototype.save = function (player, callback) {
    throw new Error("Method Not Implemented");
};


/**
 * Initiates a Player reset
 *
 * @method reset
 * @param {number} uuid Player UUID to reset
 * @param {Function} [callback] Callback function
 * @param {Object} callback.player Updated player object
 * @param {Object} callback.err Callback err or null
 */
PlayerDAO.prototype.reset = function (uuid, callback) {
    throw new Error("Method Not Implemented");
};

module.exports = PlayerDAO;