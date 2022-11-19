// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna
const express = require("express");
const {
  httpPostRegisterUser,
  httpPostLogin,
  httpGetLogout,
} = require("../controllers/user/user.controller");
const userRouter = express.Router();

userRouter.get("/logout", httpGetLogout);

userRouter.post("/register", httpPostRegisterUser);
userRouter.post("/auth", httpPostLogin);

module.exports = userRouter;
