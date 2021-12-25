const app = require("./app");

const mongoose = require("mongoose");

require("dotenv").config({ path: ".env" });

//Data base connection

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const server = app.listen(3000, () => {
  console.log("Server is running at port:   ", server.address().port);
});
