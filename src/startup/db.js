const Sequelize = require('sequelize');
console.log('process.env.MYSQL_URL==>', process.env.MYSQL_URL);
module.exports = new Sequelize(process.env.MYSQL_URL, {
  host: 'mysql',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
