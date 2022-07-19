const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,// limit each IP to 100 requests per windowMs
  message:
  {
    status: 429,
    error: 'Too Many Request',
    data: null
  }
});

module.exports = function (app, dirname) {
  
  app.set('trust proxy', 1);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(
    helmet({
      hsts: {
        maxAge: 31536000,
        includeSubDomains: false
      }
    })
  );
  app.disable('x-powered-by');
  app.use(xss());
  app.use(limiter);
  app.use(hpp());
  app.set('json spaces', 2);
  app.use(cors());
  
}
