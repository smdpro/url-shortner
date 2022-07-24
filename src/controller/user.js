const pick = require('../util/pick');
const { User } = require('../models');
const { notFound, badRequest, internal } = require('../util/error');
const { validateSignup, validateSignin } = require('../service/user');

module.exports = {
  register: async (req, res, next) => {
    try {
      const body = pick(req.body, ['name', 'userName', 'password']);
      const error = validateSignup(body);
      if (error) return badRequest(res, error);
      let user = await User.findOne({
        where: {
          userName: body.userName,
        },
      });
      if (user)
        return badRequest(res, [{ message: 'error.user.already.exist' }]);
      user = await User.create(body);

      res.json(user);
    } catch (error) {
      internal(res);
    }
  },

  login: async (req, res, next) => {
    try {
      const body = pick(req.body, ['userName', 'password']);
      const error = validateSignin(body);
      if (error) return badRequest(res, error);
      let user = await User.findOne({
        where: {
          userName: body.userName,
        },
      });
      if (!user) return notFound(res, 'error.user.not.found');
      let token = user.generateAuthToken();
      res.json({ token });
    } catch (error) {
      internal(res);
    }
  },
};
