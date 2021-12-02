const morgan = require('morgan');
module.exports = function(app) {
  // morgan.token('userId', function (req, res) { return req.userId })
  // morgan.token('agent', function (req, res) { return `{${req.useragent.os}-${req.useragent.browser}-${req.useragent.platform}}` })
  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
};
