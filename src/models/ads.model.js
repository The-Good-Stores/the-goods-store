const adsDb = require("./ads.mongo");
class Ad {
  username;
  title;
  body;
  begin;
  end;

  constructor(username, title, body, begin, end) {
    this.username = username;
    this.title = title;
    this.body = body;
    this.begin = begin;
    this.end = end;
  }
}

async function getAllAds() {
  const allAds = await adsDb.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
  return allAds;
}
async function getOneAd(_id) {
  const ad = await adsDb.findOne({ _id });
  return ad;
}

async function createAds(ad) {
  const adToSave = new Ad(ad.username, ad.title, ad.body, ad.begin, ad.end);
  try {
    await adsDb.create(adToSave);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function editAds(_id, ad) {
  try {
    await adsDb.findOneAndUpdate({ _id }, ad);
  } catch (error) {
    console.error(error);
  }
}

async function deleteAd(_id) {
  await adsDb.findOneAndDelete({ _id });
}
module.exports = {
  getAllAds,
  getOneAd,
  createAds,
  editAds,
  deleteAd,
  Ad,
};
