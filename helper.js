const bcrypt = require("bcrypt");

//Password Hash
const HashIt = async (password) => {
  const salt = await bcrypt.genSalt(6);
  return bcrypt.hash(password, salt);
};

// compare the password user entered with hashed pass.
const CompareIt = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { HashIt, CompareIt };
