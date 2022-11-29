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
  httpApiGetLogout,
  httpApiPostRegisterUser,
  httpApiPostLogin,
} = require("../controllers/user/user.controller");
const userRouter = express.Router();
//User API For Frontend
//GET METHODS
userRouter.get("/logout", httpApiGetLogout);
//POST METHODS
userRouter.post("/login", httpApiPostLogin);
userRouter.post("/register", httpApiPostRegisterUser);
module.exports = userRouter;
