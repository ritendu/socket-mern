const Joi = require("joi");

// Password & ObjectID validation.
const { password } = require("./custom.validation");

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().custom(password).required(),
  }),
};

const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const socialSignup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    countryCode: Joi.string().allow(''),
    phoneNumber: Joi.string().allow(''),
    socialId: Joi.string().required(),
    socialType: Joi.string().required(),
    role: Joi.string().required(),
    profilePicture: Joi.object({
      key: Joi.string().allow(''),
      name: Joi.string().allow(''),
      mimetype: Joi.string().allow(''),
      location: Joi.string().allow(''),
      size: Joi.number().allow(''),
      imageType: Joi.string().allow(''),
    }).optional(),
  }),
};

const socialLogin = {
  body: Joi.object().keys({
    socialId: Joi.string().required(),
    socialType: Joi.string().required(),
  }),
};

module.exports = {
  login,
  refreshToken,
  socialSignup,
  socialLogin
};
