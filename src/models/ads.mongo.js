const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
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
    begin: Date,
    end: Date,
  },
  {
    collection: "ads",
    timestamps: true,
  }
); 

export default mongoose.model("Ad", adSchema);
