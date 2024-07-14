const Joi = require("joi");
module.exports = {
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  changePasswordSchema: Joi.object({
    currentPassword: Joi.string().required().label("Current Password"),
    newPassword: Joi.string()
      .required()
      .invalid(Joi.ref("currentPassword"))
      .label("New Password"),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("newPassword"))
      .label("Confirm Password"),
  }),
  updateProfileSchema: Joi.object({
    firstName: Joi.string().required().label("First name"),
    lastName: Joi.string().required().label("Last name"),
    jobTitle: Joi.string().required().label("Job title"),
  }),
  resetPasswordSchema: Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .label("Confirm Password"),
  }),
};
