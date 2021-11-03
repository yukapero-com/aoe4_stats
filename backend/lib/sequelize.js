const appRoot = require('app-root-path');
const Config = require('config');
const c = Config['db'];
const Sequelize = require('sequelize');
const logger = require(appRoot + '/lib/logger.js');
const sequelizeLogger = logger.getLogger('sequelize');

const dbConfig = new Sequelize(
  c.database,
  c.user,
  c.password,
  {
    host: c.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: (str) => {
      sequelizeLogger.info(str);
    },
    timezone: "+09:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
);

module.exports = dbConfig;
