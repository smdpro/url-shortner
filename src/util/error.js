
module.exports.done = (res, message) => {
  return res.status(200).json({ message: message });
};

module.exports.notFound = (res, message = 'error.not.found') => {
  return res.status(404).json({ message: message });
};
module.exports.badRequest = (res, message = 'error.bad.request') => {
  return res.status(400).json({ message });
};

module.exports.forbidden = (res, message = 'error.access.denied') => {
  return res.status(403).json({ message: message });
};
