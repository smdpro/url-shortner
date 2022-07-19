
const express = require('express');
const { createClient } = require('redis');
require('colors');
const routes = require('./route/v1');
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
const server = app.listen(port, '127.0.0.1', async() => {
  console.log(`API Server listening on port : ${port}`.black.bgYellow);
  // await db.sequelize.sync({ force: true });
  await db.sequelize.authenticate({force:true});
  console.log(`Database was connected`.black.bgGreen);
});


module.exports = server;



