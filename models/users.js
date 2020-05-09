// require("../config/devConfig");
const mongoose = require("mongoose");
const { generateHashSync } = require("../utils/hash");
const { Schema, model } = mongoose;

const UserLoginSchema = new Schema({
  userId : {
    type: String,
    required:true
  },
  role : {
    type:String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  passwordHash: {
    type: String,
    required:true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required:true
  },
  phonenumber: {
    type: Number
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
});

const UserLoginModel = model("UserLoginModel", UserLoginSchema);

// const UserLoginTest = new UserLoginModel({
//   userId : "S01",
//   role: "student",
//   email: "haihero123@gmail.com",
//   passwordHash: generateHashSync("123456"),
//   firstname : "Daniel",
//   lastname : "Brian",
//   phonenumber: 9999966666
// });

// UserLoginTest
//   .save()
//   .then(response => {
//     console.log(response);
//   })
//   .catch(console.error);

module.exports = UserLoginModel;
