/**
 * Abstract QR Code Data Access Object Class
 *
 * @class CodeDAO
 * @constructor
 */
function CodeDAO() {
}

/**
 * Gets all known QR Codes from the DAO
 *
 * @method all
 * @param {Function} [callback] Callback function
 * @param {number} callback.codes All known QR Codes
 * @param {Object} callback.err Callback err or null
 */
CodeDAO.prototype.all = function (callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Gets all game related QR Codes from the DAO
 *
 * @method allGameCodes
 * @param {Function} [callback] Callback function
 * @param {number} callback.codes All game orientated QR Codes
 * @param {Object} callback.err Callback err or null
 */
CodeDAO.prototype.allGameCodes = function (callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Locates a QR Code from the DAO using the ID
 *
 * @method findById
 * @param {number} id QR Code ID to find
 * @param {Function} [callback] Callback function
 * @param {number} callback.player Found Player reference
 * @param {Object} callback.err Callback err or null
 */
CodeDAO.prototype.findById = function (id, callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Creates an instance of a QR Code within the DAO
 *
 * @method create
 * @param {Object} code QR Code object to create
 * @param {Function} [callback] Callback function
 * @param {Object} callback.code Created code object or null
 * @param {Object} callback.err Callback err or null
 */
CodeDAO.prototype.create = function (code, callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Removes an instance of a code from the DAO
 *
 * @method remove
 * @param {number} id QR Code Id to remove
 * @param {Function} [callback] Callback function
 * @param {Object} callback.err Callback err or null
 */
CodeDAO.prototype.remove = function (id, callback) {
    throw new Error("Method Not Implemented");
};

/**
 * Updates a QR Code instance
 *
 * @method save
 * @param {Object} code QR Code object to save
 * @param {Function} [callback] Callback function
 * @param {Object} callback.player Updated player object
 * @param {Object} callback.err Callback err or null
 */
CodeDAO.prototype.save = function (code, callback) {
    throw new Error("Method Not Implemented");
};

module.exports = CodeDAO;