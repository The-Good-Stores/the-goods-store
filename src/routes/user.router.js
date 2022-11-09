const express = require("express");
const { httpPostRegisterUser } = require("../controllers/user/user.controller");

const userRouter = express.Router();
userRouter.post("/register", httpPostRegisterUser);

module.exports = userRouter;
 