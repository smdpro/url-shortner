const Sequelize = require('sequelize');
const { DATABASE } = require('../config');

module.exports = new Sequelize(DATABASE.DB, DATABASE.USER, DATABASE.PASS, {
  host: DATABASE.HOST,
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
