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
  const hash = HashIt(request.body.password);

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
      response.status(500).send(error);
    });
});

app.post("/signIn", async (request, response) => {
  const users = await userModel.find({ email: request.body.email });
  //console.log("Login user:  ", users);
  var token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "7Days" });

  var Data = {
    ...{ data: users[0] },
    ...{ token: token },
  };
  const isTrue = CompareIt(request.body.password, users[0].password);

  if (isTrue && users[0].email == request.body.email) {
    response.send({
      data: Data,
      status: 1,
      message: "Request successfuly hit",
    });
  } else {
    response.send({ message: "Password is incorrect", status: 0 });
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

module.exports = app;
