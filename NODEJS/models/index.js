const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "4999", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: 0,
  // logging: true,
});
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);

module.exports = db;
