const {
  getAllAds,
  createAds,
  getOneAd,
  editAds,
  Ad,
  deleteAd,
} = require("../../models/ads.model");

async function httpGetAllAds(req, res) {
  const ads = await getAllAds();
  res.render("pages/ads", { ads });
}
async function httpGetOneAd(req, res) {
  const _id = req.params.id;
  const ad = await getOneAd(_id);
  res.render("pages/ad-details", { ad });
}
async function httpPostCreateAds(req, res) {
  const { title, username, body, begin, end } = req.body;
  console.log({ body: req.body });
  const ad = { title, username, body, begin, end };
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
  const _id = req.params.id;
  const { title, username, body, begin, end } = req.body;
  const updatedAd = new Ad(username, title, body, begin, end);
  await editAds(_id, updatedAd);
  res.redirect(`/ads/${_id}`);
}

async function httpDeleteAd(req, res) {
  const _id = req.params.id;
  const deleteResult = await deleteAd(_id);
  if (deleteResult) {
    res.redirect("/ads");
  } else {
    res.redirect(`/ads/${_id}`);
  }
}
module.exports = {
  httpGetAllAds,
  httpPostCreateAds,
  httpPostUpdateAds,
  httpGetOneAd,
  httpDeleteAd,
};
