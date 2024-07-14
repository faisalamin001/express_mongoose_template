const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../controllers/auth");

router.post("/checkEmail", function () {
  controller.checkEmail;
});

// Route to handle user registration
router.post("/register", function () {
  controller.register;
});

// Route to handle user login
router.post("/login", function () {
  controller.login;
});

module.exports = router;
