const Url = require('../api/urlShortener/model');
const { notFound, badRequest } = require('../util/error');

module.exports = {
  getLink: async (req, res, next) => {
    let result = await URL.findOne({ where: { code: req.params.id } });
    if(!result) return notFound(res);
    res.json(result);
  },

  getAll: async (req, res, next) => {
    const result = await Province.find({})
      .lean()
      .populate('cities', '_id title -province')
      .select('order title cities')
      .sort('order');
    res.json(result);
  },

  getById: async (req, res, next) => {
    const result = await City.find({ province: req.id })
      .lean()
      .select('_id title country province');
    if (!result) return notFound(res);
    res.json(result);
  },
  create: async (req, res, next) => {
    const error = validate(req.body);
    if (error) return badRequest(res, error);

    let city = new City({
      title: req.body.title,
      province: req.body.province,
      user: req.userId,
    });

    city = await city.save();

    res.json(city);
  },

  update: async (req, res, next) => {
    const error = validate(req.body);
    if (error) return badRequest(res, error);
    const updatedAt = new Date();
    const result = await City.findByIdAndUpdate(
      req.id,
      {
        title: req.body.title,
        updatedAt,
        province: req.body.province,
        client: req.userId,
      },
      { new: true }
    );

    if (!result) return notFound(res);

    res.json(result);
  },

  delete: async (req, res, next) => {
    const result = await City.findByIdAndRemove(req.id);
    if (!result) return notFound(res);
    res.json(result);
  },
};
