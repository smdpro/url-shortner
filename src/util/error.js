const { isArray } = require('util');
const httpStatus = require('http-status');
module.exports.done = (res, message) => {
  return res.status(httpStatus.OK).json({ message: message });
};

module.exports.notFound = (res, message = 'error.not.found') => {
  return res.status(httpStatus.NOT_FOUND).json({ message: message });
};
module.exports.badRequest = (res, error) => {
  const message = isArray(error) && error.length > 0 ? error[0].message : error;
  return res.status(httpStatus.BAD_REQUEST).json({ message });
};

module.exports.forbidden = (res, message = 'error.access.denied') => {
  return res.status(httpStatus.FORBIDDEN).json({ message: message });
};

module.exports.internal = (res, message = 'error.internal') => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: message });
};
