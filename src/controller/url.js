const {Url} = require('../models');
const { notFound, badRequest } = require('../util/error');
const validate = require('../util/validate');

module.exports = {
  getLink: async (req, res, next) => {
    
    let result = await Url.findOne({ where: { code: req.id } });
    if(!result) return notFound(res);
    res.redirect(result.longUrl);
  },

  getAll: async (req, res, next) => {
    const result = await Url.findAll({
      attributes: ['longUrl', 'shortUrl', 'code'],
    });
    res.json(result);
  },

  
  create: async (req, res, next) => {
    if (!validate(req.body.lonUrl)) return badRequest(res);
    
    const code = shortid.generate();
    let url = new Url.build({
      longUrl: req.body.longUrl,
      shortUrl: `${process.env.BASE_URL}/${code}`,
      code: code,
    });

    url = await url.save();

    res.json(url);
  },

  update: async (req, res, next) => {

    if (!validate(req.body.lonUrl)) return badRequest(res);
    await Url.update(
      { longUrl: req.body.lonUrl },
      {
        where: {
          code: req.id,
        },
      }
    );
    const result = await Url.findOne({
      where: { code: req.id },
      attributes: ['longUrl', 'shortUrl'],
    });
    if (!result) return notFound(res);
    res.json(result);
  },

  delete: async (req, res, next) => {
    await Url.destroy({
      where: {
        code: req.id,
      },
    });
    res.json('URL.was.deleted');
  },
};
