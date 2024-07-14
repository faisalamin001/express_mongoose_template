const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");
const ApiError = require("../utils/ApiError");
module.exports = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const authToken = req.header("Authorization");
    const secret = config.get("signIn.jwtSecret");

    if (!authToken) {
      throw new ApiError(400, "Authorization Header is required");
    }
    const decoded = jwt.verify(authToken, secret);

    const user = await Users.findByPk(userId);
    if (!user) {
      throw new ApiError(400, "User doesn't exis");
    }
    if (user.id !== decoded.user.id) {
      throw new ApiError(400, "Invalid token");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
