const adsDb = require("./ads.mongo");
class Ad {
  adsId;
  username;
  title;
  body;
  price;
  begin;
  end;
  deliveryMethod;

  constructor(id, username, title, price, body, begin, end, deliveryMethod) {
    this.username = username;
    this.title = title;
    this.body = body;
    this.begin = begin;
    this.end = end;
    this.price = price;
    this.adsId = id;
    this.deliveryMethod = deliveryMethod;
  }
}

async function getAllAds() {
  const allAds = await adsDb
    .find(
      {},
      {
        __v: 0,
        _id: 0,
      }
    )
    .sort({ createdAt: -1 });
  return allAds;
}

async function findUserAds(username) {
  const userAds = await adsDb.find({ username });
  return userAds;
}
async function getOneAd(adsId) {
  const ad = await adsDb.findOne({ adsId });
  return ad;
}

async function createAds(ad) {
  const adToSave = new Ad(
    ad.adsId,
    ad.username,
    ad.title,
    ad.price,
    ad.body,
    ad.begin,
    ad.end,
    ad.deliveryMethod
  );
  try {
    await adsDb.create(adToSave);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function editAds(adsId, ad) {
  try {
    await adsDb.findOneAndUpdate({ adsId }, ad, { new: true });
  } catch (error) {
    console.error(error);
  }
}

async function deleteAd(adsId) {
  try {
    await adsDb.findOneAndDelete({ adsId });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
module.exports = {
  getAllAds,
  getOneAd,
  createAds,
  editAds,
  deleteAd,
  findUserAds,
  Ad,
};
