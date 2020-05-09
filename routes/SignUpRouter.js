const express = require("express");
const { generateHashSync } = require("../utils/hash");
const {
  userTokenGenerator,
  userTokenValidator
} = require("../utils/userTokenManager");
const { compareHash } = require("../utils/hash");
const UserLoginModel = require("../models/users");

const SignUpRouter = express.Router();

SignUpRouter.post("/", (req, res) => {
  const {stuId,email, password,firstname,lastname,phonenumber } = req.body;
  UserLoginModel.findOne({ email })
    .exec()
    .then(userData => {
      if (userData) {
        console.log("User is found");
        res.status(200).send({
          status: "Success",
          userStatus: "UAP"
        });
      } else {

        const UserLoginTest = new UserLoginModel({
            userId : stuId,
            role : "student",
            email: email,
            passwordHash: generateHashSync(password),
            firstname : firstname,
            lastname : lastname,
            phonenumber : phonenumber,
            resetPasswordToken : null,
            resetPasswordExpires : null
          });

          UserLoginTest
            .save()
            .then(response => {
              // console.log(response);
              // LoginFunction(req);
              const jwtToken = userTokenGenerator({ email });
              // console.log(jwtToken);
              res.status(200).send({
                status: "Success",
                jwtToken
              });
            })
            .catch(error => {
                  console.log("userdata from table find"+error);
                  res.status(400).send("Invalid request !!!! ");
            });
      }
    })
    .catch(error => {
      console.log("UserLoginModel find error" + error);
      res.status(500).send("UserLoginModel find error");
    });
});


module.exports = SignUpRouter;