const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // Tell  mongooes to use Es6 promies
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: 0,
  },
});

const userModel = mongoose.model("users", UserSchema);

module.exports = { userModel };
