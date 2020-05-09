const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const sendEmail = (mailOptions) => {
   return new Promise((resolve,reject)=>{
    let message = "";
    let emailDeliveryStatus="";
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      transporter.sendMail(mailOptions)
      .then(result=>{
          console.log("result is : "+ result.response);
          emailDeliveryStatus = "email sent";
          resolve(emailDeliveryStatus);
      })
      .catch(error=>{
          console.log(error);
          emailDeliveryStatus = "error occured";
          reject(emailDeliveryStatus);
      });
    });
    //   console.log("email delivery status "+emailDeliveryStatus);
    //  return emailDeliveryStatus;
    // console.log(info.messageId);
};

exports.sendEmail = sendEmail;