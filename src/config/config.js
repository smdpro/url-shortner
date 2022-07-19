// const fs = require('fs');
// const DATABASE = require('./index');
module.exports = {
  development: {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE || 'url_shortner',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '123',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE || 'url_shortner',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '123',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE || 'url_shortner',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '123',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      //   ssl: {
      //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt'),
      //   },
    },
  },
};
