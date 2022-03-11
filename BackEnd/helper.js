const bcrypt = require("bcrypt");

//Password Hash
const HashIt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// compare the password user entered with hashed pass.
const CompareIt = async (password) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { HashIt, CompareIt };
