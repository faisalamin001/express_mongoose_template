const jwt = require("jsonwebtoken");

module.exports = {
  encrypt: (user, secret) => {
    return jwt.sign({ user }, secret);
  },
};
