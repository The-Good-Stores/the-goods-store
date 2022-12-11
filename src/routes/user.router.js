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
  httpPostEditProfile,
  httpGetUser,
} = require("../controllers/user/user.controller");
const { requireAuth } = require("./ads.router");
const userRouter = express.Router();

//User API For Frontend
//GET METHODS
userRouter.get("/logout", httpApiGetLogout);
userRouter.get("/profile", requireAuth, httpGetUser);
//POST METHODS
userRouter.post("/login", httpApiPostLogin);
userRouter.post("/register", httpApiPostRegisterUser);
userRouter.post("/edit-profile", requireAuth, httpPostEditProfile);
module.exports = userRouter;
