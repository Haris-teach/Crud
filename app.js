const express = require("express");
var MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: ".env" });
var jwt = require("jsonwebtoken");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const { userModel } = require("./models");
const { HashIt, CompareIt } = require("./helper");

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.post("/signUp", async (request, response) => {
  const hash = await HashIt(request.body.password);

  let obj = {
    name: request.body.name,
    email: request.body.email,
    password: hash,
  };

  userModel
    .findOne({ email: request.body.email })
    .then(async (result) => {
      if (result != null) {
        response.send({ message: "Email is already exist", status: 0 });
      } else {
        const user = new userModel(obj);
        await user.save();
        response.send({
          data: user,
          status: 1,
          message: "Request successfuly hit",
        });
      }
    })
    .catch((err) => {
      response.send(err);
    });
});

app.post("/signIn", async (request, response) => {
  const users = await userModel.find({ email: request.body.email });

  try {
    var token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "7Days" });
    var Data = {
      ...{ data: users[0] },
      ...{ token: token },
    };
    const isTrue = await CompareIt(request.body.password, users[0].password);
   
    if (isTrue && users[0].email == request.body.email) {
      response.send({
        data: Data,
        status: 1,
        message: "Request successfuly hit",
      });
    } else {
      response.send({ message: "Password is incorrect", status: 0 });
    }
  } catch (err) {
    console.log("Error:   ", err);
  }
});

app.get("/users", async (request, response) => {
  const users = await userModel.find();

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/SendOtp", async (req, res) => {
  const { phone } = await req.body;

 

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.verify.services
    .create({ friendlyName: "My First Verify Service" })
    .then((service) => {
      client.verify
        .services(service.sid)
        .verifications.create({ to: phone, channel: "sms" })
        .then((verification) => {
          res.send(verification.status);
          client.verify
            .services(service.sid)
            .verificationChecks.create({ to: phone, code: "225534" })
            .then((verification_check) =>
              
            );
        });
    })
    .catch((e) => {
     
      console.log(e);
     
    });
});

module.exports = app;
