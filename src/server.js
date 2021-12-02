
const express = require('express');
require('colors');
const routes = require('./route');
var db = require('./models');
const app = express();

require('./startup/express-config')(app);
require('./startup/logger')(app);

if (!process.env.JWT_PRIVATE_KEY) {
  console.log(`JWT_PRIVATE_KEY is not set`.black.bgRed);
  return;
}
if (!process.env.BASE_URL) {
  console.log(`BASE_URL is not set`.black.bgRed);
  return;
}
  

 app.use('/', routes);
// app.use(error);
const port =
  4000 +
  Number(process.env.NODE_APP_INSTANCE ? process.env.NODE_APP_INSTANCE : 0);
const server = app.listen(port, '127.0.0.1', () => {
  db.sequelize.sync();
  console.log(`API Server listening on port : ${port}`.black.bgYellow);
});


module.exports = server;


// docker run \
// --name=mysql \
// --restart=always \
// --env="MYSQL_ROOT_PASSWORD=123" \
// --publish 3306:3306 \
// --volume=/home/smd/mysql-data:/var/lib/mysql \
// mysql
