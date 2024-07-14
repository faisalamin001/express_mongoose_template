const { registerInvited } = require("./schemas/auth");
const ApiError = require("../utils/ApiError");
module.exports = {
  validateRegisterInvited: (req, res, next) => {
    const { error } = registerInvited.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      throw new ApiError(400, error.details[0].message);
    } else {
      next();
    }
  },
};
