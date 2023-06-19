const Joi = require("joi");

// Password & ObjectID validation.
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().custom(password).required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().custom(password).required(),
  }),
};



module.exports = {
  login,
  register
};
