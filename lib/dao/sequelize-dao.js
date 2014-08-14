var Util = require('util');

var DAOFactory = require('../../lib/dao/dao-factory');
var models = require('./models');

var PlayerDAO = require('./sequelize-player-dao');
var CodeDAO = require('./sequelize-code-dao');

function SequelizeDAO() {
    this._codeDAO = null;
    this._playerDAO = null;
}

Util.inherits(SequelizeDAO, DAOFactory);

SequelizeDAO.prototype.playerDAO = function () {
    if (!this._playerDAO) {
        this._playerDAO = new PlayerDAO(models.sequelize, models.Player);
    }
    return this._playerDAO;
};
SequelizeDAO.prototype.codeDAO = function () {
    if (!this._codeDAO) {
        this._codeDAO = new CodeDAO(models.Code);
    }
    return this._codeDAO;
};

module.exports = SequelizeDAO;