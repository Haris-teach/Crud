const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const userModel = require("./models");

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.post("/signUp", async (request, response) => {
  let obj = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
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
  try {
    if (users[0].password == request.body.password) {
      response.send({
        data: users[0],
        status: 1,
        message: "Request successfuly hit",
      });
    } else {
      response.send({ message: "Password is incorrect", status: 0 });
    }
  } catch (error) {
    response.status(500).send(error);
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
