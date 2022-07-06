module.exports = (app) => {
  const user = require("../controllers/user");

  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/create", user.createUser);
  router.post("/login", user.loginUser);
  router.post("/delete", user.deleteUser);
  router.post("/updateUser", user.updateUser);
  router.get("/getAll", user.getAllUsers);

  app.use("/api/user", router);
};
