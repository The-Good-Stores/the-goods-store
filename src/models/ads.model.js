// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna
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
  active;
  imgUrl;

  constructor(
    id,
    username,
    title,
    price,
    body,
    begin,
    end,
    deliveryMethod,
    active,
    imgUrl
  ) {
    this.username = username;
    this.title = title;
    this.body = body;
    this.begin = begin;
    this.end = end;
    this.price = price;
    this.adsId = id;
    this.deliveryMethod = deliveryMethod;
    this.active = active;
    this.imgUrl = imgUrl;
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
async function getActiveAds() {
  const allAds = await adsDb
    .find(
      { active: true },
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
    ad.deliveryMethod,
    ad.active,
    ad.imgUrl
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
    await adsDb.findOneAndUpdate({ adsId }, ad, {
      new: true,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function disableAd(adsId) {
  try {
    await adsDb.findOneAndUpdate({ adsId }, { active: false });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function activateAd(adsId) {
  try {
    await adsDb.findOneAndUpdate({ adsId }, { active: true });
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
  disableAd,
  findUserAds,
  activateAd,
  getActiveAds,
  Ad,
};
