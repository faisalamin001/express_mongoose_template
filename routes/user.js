const express = require("express");
const router = express.Router({ mergeParams: true });
// Controllers
const controller = require("../controllers/user");

// Middlewares
const {
  validateLogin,
  validateChangePassword,
  validateUpdateProfile,
  validateResetPassword,
} = require("../validations/user");
const authenticateUser = require("../middlewares/authenticateUser");
const validateForgotPassword = require("../middlewares/validateForgotPassword");

router.get("/", function () {
  controller.get;
});

router.post("/login", validateLogin, function () {
  controller.login;
});
router.post(
  "/:userId/changePassword",
  validateChangePassword,
  authenticateUser,
  function () {
    controller.changePassword;
  }
);
router.put(
  "/:userId/update",
  validateUpdateProfile,
  authenticateUser,
  function () {
    controller.update;
  }
);

router.get("/forgotPasswordToken", validateForgotPassword, function () {
  controller.checkForgotPasswordToken;
});
router.post(
  "/resetPassword",
  validateResetPassword,
  validateForgotPassword,
  function () {
    controller.resetPassword;
  }
);

module.exports = router;
