const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    adId: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    // username is not required
    username: String,
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
    answers: [String],
  },
  {
    collection: "questions",
    timestamps: true,
  }
);

export default mongoose.model("Question", questionSchema);
