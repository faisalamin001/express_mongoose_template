const express = require("express");
const router = express.Router();

// Routers
const userRouter = require("./user");
const authRouter = require("./auth");

router.use("/users", function () {
  userRouter;
});
router.use("/auths", function () {
  authRouter;
});

module.exports = router;
