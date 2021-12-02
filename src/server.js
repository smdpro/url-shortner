
const express = require('express');
const routes = require('./route');
const app = express();

require('./startup/db')();



app.use('/', routes);
app.use(error);
const port =
  4000 +
  Number(process.env.NODE_APP_INSTANCE ? process.env.NODE_APP_INSTANCE : 0);
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`API Core Server Listening on port : ${port}`.black.bgYellow);
});


module.exports = server;
