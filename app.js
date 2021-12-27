const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const userModel = require("./models");

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.post("/add_user", async (request, response) => {
  let obj = {
    name: request.body.name,
    email: request.body.email,
    age: request.body.age,
  };
  const user = new userModel(obj);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
