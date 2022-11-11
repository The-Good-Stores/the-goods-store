const express = require("express");
const {
  httpPostCreateAds,
  httpGetAllAds,
  httpGetOneAd,
  httpPostUpdateAds,
  httpDeleteAd,
} = require("../controllers/ads/ads.controller");

const adsRouter = express.Router();

adsRouter.get("/", httpGetAllAds);
adsRouter.get("/:id", httpGetOneAd);
adsRouter.post("/create", httpPostCreateAds);
adsRouter.post("/edit/:id", httpPostUpdateAds);
adsRouter.post("/delete/:id", httpDeleteAd);
module.exports = adsRouter;
