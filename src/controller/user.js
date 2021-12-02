const pick = require('lodash.pick');
const { User } = require('../models');
const { notFound, badRequest } = require('../util/error');
const { validateSignup, validateSignin } = require('../service/user');

module.exports = {
  register: async (req, res, next) => {
    const body = pick(req.body, ['name', 'userName', 'password']);
    const error = validateSignup(body);
    if (error) return badRequest(res, error);
    let user = await User.findOne({
      where: {
        userName: body.userName,
      },
    });
    if (user) return badRequest(res,[{message:'error.user.already.exist'}]);
    user = new User.build({ ...body });
    user = await user.save();

    res.json(user);
  },

  login: async (req, res, next) => {
    const body = pick(req.body, ['userName', 'password']);
    const error = validateSignin(body);
    if (error) return badRequest(res, error);
    let user = await User.findOne({
      where: {
        userName: body.userName,
      },
    });
    if (!user) return notFound(res,'error.user.not.found');
    let token = user.generateAuthToken();
    // const result = await User.findOne({
    //   where: { code: req.id },
    //   attributes: ['longUrl', 'shortUrl'],
    // });
    // if (!result) return notFound(res);
    res.json({ token });
  },
};
