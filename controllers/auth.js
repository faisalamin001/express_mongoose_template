const ApiError = require("../utils/ApiError");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");

module.exports = {
  checkEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await Users.count({
        where: {
          email,
        },
      });
      if (user) {
        throw new ApiError(409, "Email already exists");
      }
      res.status(200).send({
        success: true,
        message: "Please proceed! No record found",
      });
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await Users.create({
        email,
        password,
      });
      res.status(201).send({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign(
        { userId: user._id },
        config.get("signIn.jwtSecret"),
        {
          expiresIn: config.get("signIn.jwtExpiresIn"),
        }
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};
