const { Users, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");

module.exports = {
  get: async (req, res, next) => {
    try {
      const user = await Users.find();

      res.status(200).send({
        success: true,
        message: "User logged in successfully.",
        data: user,
      });
      res.send("you are at user controller");
    } catch (err) {
      next(err);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const {
        body: { currentPassword, newPassword },
        user: { email, id },
      } = req;

      const user = await Users.findOne({
        where: {
          email,
          id,
          auth_source: "Normal",
        },
      });
      if (!user) {
        throw new ApiError(404, "Something went wrong");
      }
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        throw new ApiError(400, "Your current password is incorrect");
      }
      await user.update({
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)),
      });
      res.send({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { firstName, lastName, jobTitle },
        user: { id },
      } = req;

      const user = await Users.findOne({
        attributes: ["id", "first_name", "last_name", "job_title"],
        where: {
          id,
        },
        transaction,
      });
      if (!user) {
        throw new ApiError(404, "Something went wrong");
      }
      await user.update(
        { first_name: firstName, last_name: lastName, job_title: jobTitle },
        { transaction }
      );
      await transaction.commit();
      res.send({
        success: true,
        message: "Profile updated successfully",
        data: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          jobTitle: user.job_title,
        },
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const {
        body: { password },
        data: {
          user: { id, email },
        },
      } = req;
      const user = await Users.findOne({
        where: {
          email,
          id,
          auth_source: "Normal",
        },
      });
      if (!user) {
        throw new ApiError(404, "Something went wrong");
      }

      await user.update({
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      res.send({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
