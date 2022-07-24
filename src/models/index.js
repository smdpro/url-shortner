const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.js')(sequelize, Sequelize);
db.Url = require('./url.js')(sequelize, Sequelize);

module.exports = db;
