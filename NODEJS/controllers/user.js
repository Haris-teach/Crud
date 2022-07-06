const db = require("../models");

const Op = db.Sequelize.Op;

exports.createUser = async (req, res) => {
  const { email } = req.body;
  await db.User.findOne({
    where: {
      email,
    },
  }).then((data) => {
    if (!data) {
      db.User.create(req.body)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(201).send({
            member: "User Already exist",
          });
        });
    } else {
      res.status(500).send({
        message: err.message || "deed assets cant be created",
      });
    }
  });
};

exports.loginUser = async (req, res) => {
  const { password, email } = req.body;

  await db.User.findOne({
    where: {
      email,
      password,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(201).send({ message: "User not found" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message,
      });
    });
};

exports.deleteUser = async (req, res) => {
  const { password, email } = req.body;
  const users = await db.User.findOne({
    where: {
      email,
      password,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(201).send({
          message: "User not found",
        });
      } else {
        db.User.destroy({
          where: {
            email,
          },
        }).then((res) => {
          res.status(200).send({
            message: res,
          });
        });
      }
    })

    .catch((e) => {
      res.status(500).send({
        message: e.message,
      });
    });
};

exports.updateUser = async (req, res) => {
  const { password, email } = req.body;

  await db.User.update(
    { firstName: "Haris Rajpoot" },
    {
      where: {
        firstName: "haris",
      },
    }
  );
};

exports.getAllUsers = async (req, res) => {
  const users = await db.User.findAll();

  res.send(users);
};
