// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna
const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    adsId: String,
    username: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    body: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 1000,
    },
    price: Number,
    begin: Date,
    end: Date,
    deliveryMethod: String,
    active: Boolean,
    imgUrl: String,
  },
  {
    collection: "ads",
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", adSchema);
