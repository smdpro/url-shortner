if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dev');
}
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./pro');
}

if (process.env.NODE_ENV === 'test') {
  module.exports = require('./test');
}
