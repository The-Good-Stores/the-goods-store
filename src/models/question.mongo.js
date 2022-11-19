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

const questionSchema = new mongoose.Schema(
  {
    adsId: String,
    questionId: String,
    question: String,
    answer: String,
  },
  {
    collection: "questions",
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
