import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  day: { type: mongoose.Schema.Types.ObjectId, ref: "days" },
  notes: { index: Number, text: String },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "locations" },
});

const activity = mongoose.model("activities", activitySchema);

export default activity;
