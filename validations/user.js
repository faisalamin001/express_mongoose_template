const {
  loginSchema,
  changePasswordSchema,
  updateProfileSchema,
  resetPasswordSchema,
} = require("./schemas/user");
const ApiError = require("../utils/ApiError");
module.exports = {
  validateLogin: (req, res, next) => {
    const { error } = loginSchema.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      throw new ApiError(400, error.details[0].message);
    } else {
      next();
    }
  },
  validateChangePassword: (req, res, next) => {
    const { error } = changePasswordSchema.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      throw new ApiError(400, error.details[0].message);
    } else {
      next();
    }
  },
  validateUpdateProfile: (req, res, next) => {
    const { error } = updateProfileSchema.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      throw new ApiError(400, error.details[0].message);
    } else {
      next();
    }
  },
  validateResetPassword: (req, res, next) => {
    const { error } = resetPasswordSchema.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      throw new ApiError(400, error.details[0].message);
    } else {
      next();
    }
  },
};
