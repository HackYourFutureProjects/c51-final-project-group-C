import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  day: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "days",
  },
  notes: {
    noteNumber: Number,
    text: String,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
  },
  price: {
    type: Number,
    min: 0,
    // optional: assume free if not provided
    default: 0,
  },

  activityPhotoUrls: { type: [String], default: [] },
});

const activity = mongoose.model("activities", activitySchema);

export default activity;
