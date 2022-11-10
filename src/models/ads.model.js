const adsDb = require("./ads.mongo");
const DEFAULT_AD_ID = 1;
class Ad {
  id;
  username;
  title;
  body;
  begin;
  end;

  constructor(id, username, title, body, begin, end) {
    this.id = id;
    this.username = username;
    this.title = title;
    this.body = body;
    this.begin = begin;
    this.end = end;
  }
}
async function getLatestAdsId() {
  const latestAds = await adsDb.findOne().sort("-id");
  if (!latestAds) {
    return DEFAULT_AD_ID;
  }

  return latestAds.id;
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

async function createAds(ad) {
  const id = (await getLatestAdsId()) + 1;
  const adToSave = new Ad(id, ad.username, ad.title, ad.body, ad.begin, ad.end);
  try {
    await adsDb.create(adToSave);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function editAds(ad) {
  await adsDb.findOneAndUpdate({ id: ad.id }, ad);
}

async function deleteAd(ad) {
  await adsDb.findOneAndDelete({ id: ad.id });
}
module.exports = {
  getAllAds,
  createAds,
  editAds,
  deleteAd,
  Ad,
};
