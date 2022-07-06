const db = require("./models/index");

//db.sequelize.sync({ alert: true });
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend" });
});

require("./routes/user")(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
