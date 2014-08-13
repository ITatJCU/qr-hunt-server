var Util = require("util");
var Logger = require("./logger");
var LoggerStrategy = require("./logger-strategy");
var Objects = require('./objects');

/**
 * Strategy formatted variation of the Logger class
 *
 * @class StrategyLogger
 * @extends Logger
 *
 * @param {Recorder} recorder
 * @param {LoggerStrategy} strategy
 * @constructor
 */
function StrategyLogger(recorder, strategy) {
    StrategyLogger.super_.call(this, recorder);
    this.setStrategy(strategy);
}
Util.inherits(StrategyLogger, Logger);

/**
 * Sets the strategy formatting implementation
 *
 * @method setStrategy
 * @param {LoggerStrategy} strategy Formatting strategy implementation
 * @default LoggerStrategy
 */
StrategyLogger.prototype.setStrategy = function (strategy) {
    if (!Objects.IsPrototypeOf(strategy, LoggerStrategy)) {
        strategy = new LoggerStrategy();
    }
    this._strategy = strategy;
};

/**
 * Gets the strategy formatting implementation
 *
 * @method strategy
 * @returns {LoggerStrategy} Logger formatting strategy
 */
StrategyLogger.prototype.strategy = function () {
    return this._strategy;
};

module.exports = StrategyLogger;