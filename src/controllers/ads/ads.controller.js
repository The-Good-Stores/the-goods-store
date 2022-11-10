const { getAllAds, createAds } = require("../../models/ads.model");

async function httpGetAllAds(req, res) {
  const ads = await getAllAds();
  res.render("pages/ads", { ads });
}

async function httpPostCreateAds(req, res) {
  const { title, username, body, begin, end } = req.body;
  const ad = { title, username, body, begin, end };

  const createResult = await createAds(ad);
  if (createResult) {
    // What page we can redirect after user create ad successfully?
    res.redirect("/");
  } else {
    // Something went wrong, the ad cannot create
    res.redirect("/");
  }
}

module.exports = {
  httpGetAllAds,
  httpPostCreateAds,
};
