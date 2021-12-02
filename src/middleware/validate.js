const shortid = require('shortid');
const { badRequest } = require('../util/error');

module.exports = function () {
  return (req, res, next) => {
      if (req.params.id) {
        if(shortid.isValid(req.params.id))
        return badRequest(res, 'error.id.invalid');
      } else return badRequest(res, 'error.invalid.id');
    req.id = req.params.id;
    next();
  };
};
