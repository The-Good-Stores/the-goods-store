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
const userRouter = require("./user.router");
const { adsRouter } = require("./ads.router");
const router = express.Router();

router.use("/ads", adsRouter);
router.use("/user", userRouter);
module.exports = router;
