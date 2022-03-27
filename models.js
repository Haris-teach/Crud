const mongoose = require("mongoose");
const Joi = require("joi");
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
    required: true,
  },
});

const userModel = mongoose.model("users", UserSchema);

// const validate = (user) => {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//   });
//   return schema.validate(user);
// };

module.exports = { userModel };
