// require("../config/devConfig");
const mongoose = require("mongoose");
const { generateHashSync } = require("../utils/hash");
const { Schema, model } = mongoose;

const UsersQuizDetailsSchema = new Schema({
  userId : {
    type: String,
    required:true
  },
  quizId : {
      type:String,
      required:true
  },
  questions :{
      type:Array
  }
});

const UsersQuizDetailsModel = model("UsersQuizDetailsModel", UsersQuizDetailsSchema);

// const UserQuizDetailTest = new UsersQuizDetailsModel({
//   userId : "S01",
//   quizId : 12345678,
//   questions : [
//       {
//       question:"what is ur company",
//       useranswer: "tcs",
//       correctAnswer : "fis"
//     },
//     {
//         question:"what is ur college",
//         useranswer: "tce",
//         correctAnswer : "tce"
//     }
//   ]
// });

// UserQuizDetailTest
//   .save()
//   .then(response => {
//     console.log(response);
//   })
//   .catch(console.error);

module.exports = UsersQuizDetailsModel;
