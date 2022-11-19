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
} = require("../controllers/api/ads.api.controller");
const apiRouter = express.Router();

//Ads API For Frontend

//GET METHODS
//GET all ads
apiRouter.get("/ads/all", httpApiGetAllAds);
//GET user ads by username
apiRouter.get("/ads/user/:username", httpApiGetUserAds);
//GET one ad by Ads Id
apiRouter.get("/ads/:id", httpApiGetOneAd);

//POST METHODS
//POST ad
apiRouter.post("/ads/post", httpApiPostAds);
//POST update ad (params: id = AdsId)
apiRouter.post("/ads/update/:id", httpApiPostUpdateAd);
//POST activate ad (params: id = AdsId)
apiRouter.post("/ads/activate/:id", httpApiActivateAd);
//POST disable ad (params: id = AdsId)
apiRouter.post("/ads/disable/:id", httpApiDisableAd);
//POST add question (params: id = adsId)
apiRouter.post("/ads/add-question/:id", httpApiPostQuestion);
//POST add answer (params: id = adsId && qid = quesiton id)
apiRouter.post("/ads/add-answer/:id/:qid", httpApiPostAddAnswer);
module.exports = apiRouter;
