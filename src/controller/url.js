const Url = require('../models/url');
const { DOMAIN } = require('../config');
const { notFound, badRequest } = require('../util/error');
const validate = require('../util/validate');

module.exports = {
  getLink: async (req, res, next) => {
    let result = await URL.findOne({ where: { code: req.id } });
    if(!result) return notFound(res);
    res.redirect(result.longUrl);
  },

  getAll: async (req, res, next) => {
    const result = await URL.findAll({
      attributes: ['longUrl', 'shortUrl', 'code'],
    });
    res.json(result);
  },

  
  create: async (req, res, next) => {
    if (!validate(req.body.lonUrl)) return badRequest(res);
    
    const code = shortid.generate();
    let url = new URL.build({
      longUrl: req.body.longUrl,
      shortUrl: `${DOMAIN}/${code}`,
      code: code,
    });

    url = await url.save();

    res.json(url);
  },

  update: async (req, res, next) => {

    if (!validate(req.body.lonUrl)) return badRequest(res);
    await URL.update(
      { longUrl: req.body.lonUrl },
      {
        where: {
          code: req.id,
        },
      }
    );
    const result = await URL.findOne({
      where: { code: req.id },
      attributes: ['longUrl', 'shortUrl'],
    });
    if (!result) return notFound(res);
    res.json(result);
  },

  delete: async (req, res, next) => {
    await URL.destroy({
      where: {
        code:req.id
      },
    });
    res.json('URL.was.deleted');
  },
};
