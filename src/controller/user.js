const pick = require('lodash.pick');
const { User } = require('../models');
const { notFound, badRequest } = require('../util/error');
const { validateSignup, validateSignin } = require('../service/user');

module.exports = {
  register: async (req, res, next) => {
    const body = pick(req.body, ['name','userName','password']);
    const error = validateSignup(body);
    if (error) return badRequest(res, error);

    let user = new User.build({...body });

    user = await user.save();

    res.json(user);
  },

  login: async (req, res, next) => {
    const body = pick(req.body, ['userName', 'password']);
    const error = validateSignin(body);
    if (error) return badRequest(res, error);
    await User.update(
      { longUrl: req.body.lonUrl },
      {
        where: {
          code: req.id,
        },
      }
    );
    const result = await User.findOne({
      where: { code: req.id },
      attributes: ['longUrl', 'shortUrl'],
    });
    if (!result) return notFound(res);
    res.json(result);
  },
};
