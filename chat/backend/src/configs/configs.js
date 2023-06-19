const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(1440)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),
    // SENDGRID_API_KEY: Joi.string().description("Sendgrid Api key"),
    // EMAIL_FROM: Joi.string().description("Email from sendgrid."),
    // S3_ACCESS_KEY_ID: Joi.string().required().description("S3 Access key"),
    // S3_SECRET_KEY: Joi.string().required().description("S3 Secret key"),
    // S3_BUCKET_NAME: Joi.string().required().description("S3 Bucket name"),
    // S3_BUCKET_REGION: Joi.string().required().description("S3 Bucket Region"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },

  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },

  // aws: {
  //   s3: {
  //     accessKeyId: envVars.S3_ACCESS_KEY_ID,
  //     secretKey: envVars.S3_SECRET_KEY,
  //     bucketName: envVars.S3_BUCKET_NAME,
  //     bucketRegion: envVars.S3_BUCKET_REGION,
  //   },
  // },

  // sendgrid: {
  //   api_key: envVars.SENDGRID_API_KEY,
  //   email_from: envVars.EMAIL_FROM,
  // },
};
