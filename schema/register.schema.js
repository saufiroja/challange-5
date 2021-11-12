const Joi = require("joi");

exports.registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  roleName: Joi.string().optional(),
});
