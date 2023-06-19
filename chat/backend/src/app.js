const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const fileupload = require("express-fileupload");
const { errorConverter, errorHandler } = require("./middlewares/error");
const { jwtStrategy } = require("./configs/passport");
const morgan = require("./configs/morgan");
const DBconnect = require("./configs/db.config");
const config = require("./configs/configs");
const routes = require("./routes/index");
const ApiError = require("./utils/ApiError");

const app = express();

// Database connection.
DBconnect.DBconnect();

// enable cors
app.use(cors());
app.options("*", cors());

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers.
app.use(helmet());

// parse json.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Set Static directory.
app.use(express.static("./public"));

// File upload.
app.use(fileupload());

// Routes.
app.use("/api", routes);

// Error handeling.
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Page Not found"));
});
app.use(errorConverter);
app.use(errorHandler);
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


