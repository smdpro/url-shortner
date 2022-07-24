const shortid = require('shortid');
const { createClient } = require('redis');
const { Url } = require('../models');
const { notFound, badRequest, internal } = require('../util/error');
const validate = require('../util/validate');
const client = createClient({ url: process.env.REDIS_URL });
module.exports = {
  getLink: async (req, res, next) => {
    try {
      await client.connect();
      const value = await client.get(req.id);
      if (value) return res.redirect(value);
      let result = await Url.findOne({ where: { code: req.id } });
      if (!result) return notFound(res);
      await client.set(req.id, result.longUrl);
      res.redirect(result.longUrl);
    } catch (error) {
      internal(res);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const result = await Url.findAll({
        where: { userId: req.userId },
        attributes: ['longUrl', 'shortUrl', 'code'],
      });
      res.json(result);
    } catch (error) {
      internal(res);
    }
  },

  create: async (req, res, next) => {
    try {
      if (!validate(req.body.longUrl))
        return badRequest(res, [{ message: 'error.url.is.not.valid' }]);

      const code = shortid.generate();
      let url = await Url.create({
        longUrl: req.body.longUrl,
        shortUrl: `${process.env.BASE_URL}/${code}`,
        code: code,
        userId: req.userId,
      });

      // const result = await Url.findOne({
      //   where: { code: req.id, userId: req.userId },
      //   attributes: ['longUrl', 'shortUrl', 'code'],
      // });
      res.json(url);
    } catch (error) {
      internal(res);
    }
  },

  update: async (req, res, next) => {
    try {
      if (!validate(req.body.longUrl))
        return badRequest(res, [{ message: 'error.url.is.not.valid' }]);
      await Url.update(
        { longUrl: req.body.longUrl, updatedAt: new Date() },
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
      await client.connect();
      await client.set(req.id, result.longUrl);
      res.json(result);
    } catch (error) {
      internal(res);
    }
  },

  delete: async (req, res, next) => {
    try {
      await Url.destroy({
        where: {
          code: req.id,
          userId: req.userId,
        },
      });
      await client.connect();
      await client.del(req.id);
      res.json('URL.was.deleted');
    } catch (error) {
      internal(res);
    }
  },
};
