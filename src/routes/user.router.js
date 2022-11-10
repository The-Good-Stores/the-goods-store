const express = require("express");
const {
  httpPostRegisterUser,
  httpPostLogin,
} = require("../controllers/user/user.controller");

const userRouter = express.Router();

userRouter.post("/register", httpPostRegisterUser);
userRouter.post("/auth", httpPostLogin);

module.exports = userRouter;
