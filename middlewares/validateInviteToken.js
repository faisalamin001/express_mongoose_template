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
    let decoded = jwt.verify(token, secret, { ignoreExpiration: true });
    const email = decoded.email || decoded.userEmail;
    if (!email) {
      throw new ApiError(400, "User email not found in token");
    }

    req.data = {
      email,
      iat: decoded.iat,
      exp: decoded.exp,
    };
    next();
  } catch (err) {
    next(err);
  }
};
