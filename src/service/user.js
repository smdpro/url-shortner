const Joi =require('joi');
const ErrorMapper =require('../util/errorMapper');

const schemaSignup = {
  name: Joi.string()
    .min(5)
    .max(50)
    .required(),
  userName: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .required()
};
exports.validateSignup = values => ErrorMapper(values, schemaSignup);

const schemaSignin = {
  userName: Joi.string().email().required(),
  password: Joi.string(6).max(20).required(),
};

exports.validateSignin = values => ErrorMapper(values, schemaSignin);

