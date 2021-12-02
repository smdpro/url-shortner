const shortid =require('shortid');
const { Url } = require('../models');
const { notFound, badRequest } = require('../util/error');
const validate = require('../util/validate');

module.exports = {
  getLink: async (req, res, next) => {
    let result = await Url.findOne({ where: { code: req.id } });
    if (!result) return notFound(res);
    res.redirect(result.longUrl);
  },

  getAll: async (req, res, next) => {
    const result = await Url.findAll({
      where: { userId: req.userId },
      attributes: ['longUrl', 'shortUrl', 'code'],
    });
    res.json(result);
  },

  create: async (req, res, next) => {
    if (!validate(req.body.longUrl))
      return badRequest(res, [{ message: 'error.url.is.not.valid' }]);

    const code = shortid.generate();
    let url = await Url.create({
      longUrl: req.body.longUrl,
      shortUrl: `${process.env.BASE_URL}/${code}`,
      code: code,
      userId: req.userId,
    });

    const result = await Url.findOne({
      where: { code: req.id, userId: req.userId },
      attributes: ['longUrl', 'shortUrl','code'],
    });
    res.json(result);

    res.json(url);
  },

  update: async (req, res, next) => {
    if (!validate(req.body.longUrl))
      return badRequest(res, [{ message: 'error.url.is.not.valid' }]);
    await Url.update(
      { longUrl: req.body.longUrl, updatedAt:new Date() },
      {
        where: {
          code: req.id,
          userId: req.userId,
        },
      }
    );
    const result = await Url.findOne({
      where: { code: req.id, userId: req.userId },
      attributes: ['longUrl', 'shortUrl'],
    });
    res.json(result);
  },

  delete: async (req, res, next) => {
    await Url.destroy({
      where: {
        code: req.id,
        userId: req.userId,
      },
    });
    res.json('URL.was.deleted');
  },
};
