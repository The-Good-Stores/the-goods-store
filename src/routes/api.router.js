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
const {
  httpApiGetLogout,
  httpApiPostRegisterUser,
  httpApiPostLogin,
} = require("../controllers/api/user.api.controller");
const apiRouter = express.Router();

//Ads API For Frontend
//GET METHODS
apiRouter
  //GET all ads
  .get("/ads/all", httpApiGetAllAds)
  //GET user ads by username
  .get("/ads/user/:username", httpApiGetUserAds)
  //GET one ad by Ads Id
  .get("/ads/:id", httpApiGetOneAd);
//POST METHODS
//POST ad
apiRouter
  .post("/ads/post", httpApiPostAds)
  //POST update ad (params: id = AdsId)
  .post("/ads/update/:id", httpApiPostUpdateAd)
  //POST activate ad (params: id = AdsId)
  .post("/ads/activate/:id", httpApiActivateAd)
  //POST disable ad (params: id = AdsId)
  .post("/ads/disable/:id", httpApiDisableAd)
  //POST add question (params: id = adsId)
  .post("/ads/add-question/:id", httpApiPostQuestion)
  //POST add answer (params: id = adsId && qid = quesiton id)
  .post("/ads/add-answer/:id/:qid", httpApiPostAddAnswer);

//User API For Frontend
//GET METHODS
apiRouter.get("/user/logout", httpApiGetLogout);
//POST METHODS
apiRouter.post("/user/login", httpApiPostLogin);
apiRouter.post("/user/register", httpApiPostRegisterUser);
module.exports = apiRouter;
