var Util = require("util");
var Recorder = require("./recorder");
var Objects = require("./objects");

/**
 * Composite Recorder
 *
 * Allows group based logging to multiple {Recorder} objects
 *
 * @class CompositeRecorder
 * @constructor
 * @extends Recorder
 */
function CompositeRecorder() {
    this.clear();
}

Util.inherits(CompositeRecorder, Recorder);


/**
 * Clears or removes all associated {Recorder}s
 * @method clear
 */
CompositeRecorder.prototype.clear = function () {
    this._recorders = [];
};

/**
 * Gets the total number of associated {Recorder}s
 * @method size;
 * @returns {number}
 */
CompositeRecorder.prototype.size = function () {
    return this._recorders.length;
};

/**
 * Records the specified message with each associated {Recorder}
 *
 * @method record
 * @param {String} message Message to record
 */
CompositeRecorder.prototype.record = function (message) {
    throw new Error("Method Not Implemented");
};


module.exports = CompositeRecorder;