const express = require("express");
var jwt = require("jsonwebtoken");
const app = express();
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(bodyParser.json());

const userModel = require("./models");

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.post("/signUp", async (request, response) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    console.log("Hash", salt, err);
    bcrypt.hash(request.body.password, salt, (err, hash) => {
      // Now we can store the password hash in db.
      console.log("Hash", hash, err);
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
  });
});

app.post("/signIn", async (request, response) => {
  const users = await userModel.find({ email: request.body.email });
  //console.log("Login user:  ", users);
  var token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "7Days" });
  var hash = bcrypt.hashSync(users[0].password, saltRounds);

  var Data = {
    ...{ data: users[0] },
    ...{ token: token },
  };

  bcrypt.compare(request.body.password, users[0].password, function (err, res) {
    if (res == true && users[0].email == request.body.email) {
      response.send({
        data: Data,
        status: 1,
        message: "Request successfuly hit",
      });
    } else {
      response.send({ message: "Password is incorrect", status: 0 });
    }
  });
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
