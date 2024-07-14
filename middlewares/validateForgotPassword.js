const jwt = require("jsonwebtoken");
const config = require("../config");
const ApiError = require("../utils/ApiError");
module.exports = async (req, res, next) => {
  try {
    const { token } = req.query || req.body;
    const secret = config.get("signIn.jwtSecret");
    if (!token) {
      throw new ApiError(400, "Token is missing");
    }
    let decoded = jwt.verify(token, secret);
    req.data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
