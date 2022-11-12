const {
  getAllAds,
  createAds,
  getOneAd,
  editAds,
  Ad,
  deleteAd,
  findUserAds,
} = require("../../models/ads.model");
const { v4: uuidv4 } = require("uuid");
async function httpGetAllAds(req, res) {
  const ads = await getAllAds();
  res.render("pages/ads", { ads, user: req.user });
}

async function httpGetPostPage(req, res) {
  const emptyAd = new Ad();
  res.render("pages/post", { user: req.user, caution: "", ad: emptyAd });
}

async function httpGetEditPage(req, res) {
  const adsId = req.params.id;
  const adToEdit = await getOneAd(adsId);
  res.render("pages/post", { user: req.user, caution: "", ad: adToEdit });
}
async function httpGetUserAds(req, res) {
  const username = req.user.username;
  const userAds = await findUserAds(username);
  console.log({ userAds });
  res.render("pages/manage", { ads: userAds, user: req.user });
}
async function httpGetOneAd(req, res) {
  const _id = req.params.id;
  const ad = await getOneAd(_id);
  res.render("pages/display", { ad, user: req.user });
}
async function httpPostCreateAds(req, res) {
  const { title, body, price, end, deliveryMethod } = req.body;
  const username = req.user.username;
  const begin = new Date();
  console.log({ body: req.body });
  const ad = {
    adsId: uuidv4(),
    title,
    username,
    price,
    body,
    begin,
    end,
    deliveryMethod,
  };
  console.log({ ad });
  const createResult = await createAds(ad);
  if (createResult) {
    // What page we can redirect after user create ad successfully?
    res.redirect("/");
  } else {
    // Something went wrong, the ad cannot create
    res.redirect("/");
  }
}

async function httpPostUpdateAds(req, res) {
  const adsId = req.params.id;
  const { title, body, price, end, deliveryMethod } = req.body;
  const updatedAd = { title, body, price, end, deliveryMethod };
  await editAds(adsId, updatedAd);
  res.redirect(`/ads/${adsId}`);
}

async function httpDeleteAd(req, res) {
  const adsId = req.params.id;
  const deleteResult = await deleteAd(adsId);
  if (deleteResult) {
    res.redirect("/ads/manage");
  } else {
    res.redirect(`/ads/${adsId}`);
  }
}
module.exports = {
  httpGetAllAds,
  httpPostCreateAds,
  httpPostUpdateAds,
  httpGetOneAd,
  httpDeleteAd,
  httpGetUserAds,
  httpGetPostPage,
  httpGetEditPage,
};
