// require('dotenv').config();

const mongoose = require("mongoose");
// const path = require("path");

// require('dotenv').config({path: __dirname + '../.env'});

// console.log("Dir name " + __dirname+ '../.env');
// // console.log("MongoDB+URL value is :" + process.env.MongoDB_URL);
// // console.log("process.env values : " + process.env);
// console.log("DB_URI value is :" + process.env.DB_URI);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
console.log("mongo db connection is runninig");
db.on("error", error => {
  console.log("MongoDB Connection error");
  console.error(error);
});

module.exports = db;
