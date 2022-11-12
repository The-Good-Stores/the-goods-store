const express = require("express");
const {
  httpPostCreateAds,
  httpGetAllAds,
  httpGetOneAd,
  httpPostUpdateAds,
  httpDeleteAd,
  httpGetUserAds,
  httpGetPostPage,
  httpGetEditPage,
  httpPostQuestion,
  httpPostAddAnswer,
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
adsRouter.post("/:id/:qid/answer", httpPostAddAnswer);
adsRouter.get("/delete/:id", httpDeleteAd);
adsRouter.post("/create", httpPostCreateAds);
adsRouter.post("/edit/:id", httpPostUpdateAds);

module.exports = adsRouter;
