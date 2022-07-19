const { isArray } = require('util');
module.exports.done = (res, message) => {
  return res.status(200).json({ message: message });
};

module.exports.notFound = (res, message = 'error.not.found') => {
  return res.status(404).json({ message: message });
};
module.exports.badRequest = (res, error) => {
  const message = isArray(error) && error.length > 0 ? error[0].message : error;
  return res.status(400).json({ message });
};

module.exports.forbidden = (res, message = 'error.access.denied') => {
  return res.status(403).json({ message: message });
};

module.exports.internal = (res, message = 'error.internal') => {
  return res.status(500).json({ message: message });
};
