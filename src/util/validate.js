const shortid = require('shortid');
const validUrl = require('valid-url');
module.exports = (longUrl) => {
  return validUrl.isUri(longUrl)
};
