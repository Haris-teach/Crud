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
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
