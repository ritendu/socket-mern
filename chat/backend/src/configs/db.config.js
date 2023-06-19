const mongoose = require("mongoose");
const config = require("./configs");

module.exports.DBconnect = async () => {
  mongoose.connect(config.mongoose.url);
  mongoose.connection
    .once("open", () => console.log("Connected to Mongodb..."))
    .on("err", (err) => {
      throw err;
    });
};
