const express = require("express");
const UsersQuizDetailsModel = require("../models/usersQuizDetails");

const QuizRouter = express.Router();

QuizRouter.post("/:stuId/:quizId",(req,res)=>{

    const {questions,stuId,quizId} = req.body;

    const UserQuizDetailTest = new UsersQuizDetailsModel({
          userId : stuId,
          quizId : quizId,
          questions : questions
        });
        
        UserQuizDetailTest
          .save()
          .then(response => {
            // console.log(response);
            res.status(200).send({
                status: "Success"
              });
          })
          .catch(error => {
            res.status(400).send("Error while updated the result in DB ");
          });
})

module.exports = QuizRouter;