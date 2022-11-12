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
