const fs = require('fs');
const DATABASE = require('./index');
module.exports = {
  development: {
    username: DATABASE.USER,
    password: DATABASE.PASS,
    database: DATABASE.DB,
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: DATABASE.USER,
    password: DATABASE.PASS,
    database: DATABASE.DB,
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: DATABASE.USER,
    password: DATABASE.PASS,
    database: DATABASE.DB,
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt'),
    //   },
    },
  },
};
