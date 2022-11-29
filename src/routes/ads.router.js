// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const {
  httpApiGetAllAds,
  httpApiGetOneAd,
  httpApiGetUserAds,
  httpApiPostAds,
  httpApiPostUpdateAd,
  httpApiActivateAd,
  httpApiDisableAd,
  httpApiPostQuestion,
  httpApiPostAddAnswer,
} = require("../controllers/ads/ads.controller");
const adsRouter = express.Router();
function requireAuth(req, res, next) {
  const token = req.headers.authentication.split(" ")[1];
  resolvedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = resolvedToken.user;
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: "Unathorized",
  });
}
//Ads API For Frontend
//GET METHODS
adsRouter
  //GET all ads
  .get("/all", httpApiGetAllAds)
  //GET user ads by username
  .get("/user/:username", httpApiGetUserAds)
  //GET one ad by Ads Id
  .get("/:id", httpApiGetOneAd);
//POST METHODS
//POST ad
adsRouter
  .post("/post", requireAuth, httpApiPostAds)
  //POST update ad (params: id = AdsId)
  .post("/update/:id", requireAuth, httpApiPostUpdateAd)
  //POST activate ad (params: id = AdsId)
  .post("/activate/:id", requireAuth, httpApiActivateAd)
  //POST disable ad (params: id = AdsId)
  .post("/disable/:id", requireAuth, httpApiDisableAd)
  //POST add question (params: id = adsId)
  .post("/add-question/:id", httpApiPostQuestion)
  //POST add answer (params: id = adsId && qid = quesiton id)
  .post("/add-answer/:id/:qid", requireAuth, httpApiPostAddAnswer);
module.exports = adsRouter;
