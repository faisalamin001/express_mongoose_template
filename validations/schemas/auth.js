const Joi = require("joi");
module.exports = {
  userRegister: Joi.object({
    firstName: Joi.string().required().label("First name"),
    lastName: Joi.string().required().label("Last name"),
    jobTitle: Joi.string().required().label("Job title"),
    email: Joi.string().required().email().label("email"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string()
      .required()
      .equal(Joi.ref("password"))
      .label("Confirm Password"),
    termsAccepted: Joi.boolean().valid(true).required().label("Terms and conditions check").messages({
      'any.only': '{{#label}} must be accepted',
    })
  }),
};
