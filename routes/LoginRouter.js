const express = require("express");
const {
  userTokenGenerator,
  userTokenValidator
} = require("../utils/userTokenManager");
const { compareHash } = require("../utils/hash");
const UserLoginModel = require("../models/users");

const LoginRouter = express.Router();


LoginRouter.post("/login", (req, res) => {
//   console.log("entered into LoginRouter");
// console.log(req.body);
  const { email, password } = req.body;
  // console.log(email);
  UserLoginModel.findOne({ email })
    .exec()
    .then(userData => {
      if (userData) {
        // console.log("User is found");
        compareHash(password, userData.passwordHash)
        .then(result => {
          if (result) {
            // console.log("password matched");
            const jwtToken = userTokenGenerator({ email });
            // console.log(jwtToken);
            const name = userData.firstname +" "+ userData.lastname;
            // console.log(" user's name is "+name);
            res.status(200).send({
              status: "Success",
              name,
              userId : userData.userId,
              jwtToken
            });
          } else {
            console.log("Invalid request");
            res.status(400).send({
              status : "user not found"
            });
          }
        })
        .catch(error => {
          console.error(error);
          res.status(500).send("Internal Server Error");
        });
      } else {
        // console.log("userdata from table find"+userData);
        res.status(400).send("Invalid request !!!! ");
      }
    })
    .catch(error => {
      console.log("UserLoginModel find error" + error);
      res.status(500).send("UserLoginModel find error");
    });
});

LoginRouter.get("/isLoggedIn", (req, res) => {
  // const { jwt = "" } = req.cookies; // use this if using cookies
  const jwt = req.header("Authorization");
  // console.log("entered into isLoggedIn route");
  // console.log("jwt toke "+jwt);
  if(jwt!==null){
      if (userTokenValidator(jwt)) {
        // console.log("jwt token validated");
        // res.json({message : "logged in"});
        res.status(200).send({
          loggedInStatus: true
        });
      } else {
        // console.log("jwt validation failed");
        res.status(200).send({
          loggedInStatus: false
        });
      }
}else{
  res.status(200).send({
    loggedInStatus: false
  });
}
});


 const LoginFunction = (req,res) => {
  const { email, password } = req.body;
  // console.log(email);
  UserLoginModel.findOne({ email })
    .exec()
    .then(userData => {
      if (userData) {
        // console.log("User is found");
        compareHash(password, userData.passwordHash)
        .then(result => {
          if (result) {
            // console.log("password matched");
            const jwtToken = userTokenGenerator({ email });
            // console.log(jwtToken);
            res.status(200).send({
              status: "Success",
              jwtToken
            });
          } else {
            // console.log("Invalid request");
            res.status(400).send("Invalid Request");
          }
        })
        .catch(error => {
          console.error(error);
          res.status(500).send("Internal Server Error");
        });
      } else {
        // console.log("userdata from table find"+userData);
        res.status(400).send("Invalid request !!!! ");
      }
    })
    .catch(error => {
      console.log("UserLoginModel find error" + error);
      res.status(500).send("UserLoginModel find error");
    });
}

module.exports = LoginRouter;
exports = LoginFunction;