require("../config/devConfig");
const mongoose = require("mongoose");
const { generateHashSync } = require("../utils/hash");
const { Schema, model } = mongoose;
const UsersQuizDetailsModel = require("./usersQuizDetails");

const userModelTest = () => {
    quizId = "12345678";
    UsersQuizDetailsModel.findOne({quizId})
    .exec()
    .then(response => {
        console.log(response);
        console.log(response.userId);
        console.log(response.questions[0]);
        console.log(response.questions[0].question);
    })
    .catch(error=>{
        console.log(error);
    });
}

const usersQustions = userModelTest();




