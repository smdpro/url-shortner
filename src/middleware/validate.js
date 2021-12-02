
const { badRequest } = require('../util/error');

// const validate = (values) => ErrorMapper(values, Joi.objectId().required());
module.exports = function () {
  return (req, res, next) => {
    
    //   if (req.params.id) {
    //     const error = validate(req.params.id);
    //     if (error) return badRequest(res, error);
    //   } else return badRequest(res, 'error.invalid.id');
    
    next();
  };
};
