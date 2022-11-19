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
  httpPostCreateAds,
  httpGetAllAds,
  httpGetOneAd,
  httpPostUpdateAds,
  httpdisableAd,
  httpGetUserAds,
  httpGetPostPage,
  httpGetEditPage,
  httpPostQuestion,
  httpPostAddAnswer,
  httpActivateAd,
} = require("../controllers/ads/ads.controller");

const adsRouter = express.Router();

function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
adsRouter.get("/", httpGetAllAds);
adsRouter.get("/manage", requireAuth, httpGetUserAds);
adsRouter.get("/post", requireAuth, httpGetPostPage);
adsRouter.get("/edit/:id", requireAuth, httpGetEditPage);

adsRouter.get("/:id", httpGetOneAd);
adsRouter.post("/:id/leave-question", httpPostQuestion);
adsRouter.post("/:id/:qid/answer", requireAuth, httpPostAddAnswer);
adsRouter.get("/disable/:id", requireAuth, httpdisableAd);
adsRouter.get("/activate/:id", requireAuth, httpActivateAd);
adsRouter.post("/create", requireAuth, httpPostCreateAds);
adsRouter.post("/edit/:id", requireAuth, httpPostUpdateAds);

module.exports = adsRouter;
