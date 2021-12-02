const Url = require('../api/urlShortener/model');
const { notFound, badRequest } = require('../util/error');
const validate = require('../util/validate');

module.exports = {
  getLink: async (req, res, next) => {
    let result = await URL.findOne({ where: { code: req.params.id } });
    if(!result) return notFound(res);
    res.json(result);
  },

  getAll: async (req, res, next) => {
    const result = await URL.findAll({
      attributes: ['longUrl', 'shortUrl', 'code'],
    });
    res.json(result);
  },

  
  create: async (req, res, next) => {
    // const error = validate(req.body);
    // if (error) return badRequest(res, error);

    let url = new URL({
      longUrl: req.body.title,
      shortUrl: req.body.province,
      code: req.userId,
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
    // const result = await URL.findByIdAndRemove(req.id);
    // if (!result) return notFound(res);
    res.json('URL.was.deleted');
  },
};
