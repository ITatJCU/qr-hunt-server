var Util = require("util");
var CodeDAO = require("./code-dao");

/**
 * Sequelize QR Code Data Access Object
 *
 *
 * @class SequelizeCodeDAO
 * @param {SequelizeModel} code Sequelize Code Model Definition.
 * @constructor
 * @extends CodeDAO
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
    _codeModel.all().complete(function (err, codes) {
        if (callback) {
            callback(codes, err);
        }
    });
};

SequelizeCodeDAO.prototype.allGameCodes = function (callback) {
    _codeModel.findAll({where: ["gameIndex > ?", 0], orderBy: 'gameIndex DESC'}).complete(function (err, codes) {
        if (callback) {
            callback(codes, err);
        }
    });
};

SequelizeCodeDAO.prototype.findById = function (id, callback) {
    _codeModel.find({where: ["uuid = ?", id]}).complete(function (err, code) {
        if (callback) {
            callback(code, err);
        }
    });
};

SequelizeCodeDAO.prototype.create = function (code, callback) {
    _codeModel.findOrCreate({id: code.id}, code).complete(function (err, result) {
        if (callback) {
            callback(result, err);
        }
    });
};

SequelizeCodeDAO.prototype.remove = function (id, callback) {
    _codeModel.destroy({uuid: id}).complete(function (err) {
        if (callback) {
            callback(err);
        }
    });
};

SequelizeCodeDAO.prototype.save = function (code, callback) {
    _codeModel.find(code.id).complete(function (err, res) {
        if (!err) {
            res.updateAttributes(code).complete(function (e) {
                if (callback) {
                    callback(res, e);
                }
            })
        } else if (callback) {
            callback(code, err);
        }
    });
};


module.exports = SequelizeCodeDAO;