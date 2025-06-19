import mongoose from "mongoose";
import locationSchema from "./schemas/LocationSchema.js";

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  day: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "days",
    required: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  price: {
    type: String, // To support formats like "150€ per night", "30$ per person", etc.
    trim: true,
    default: "",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  activityPhotoUrls: { type: [String], default: [] },

  activityNumber: {
    type: Number,
    default: 1,
  },
  order: {
    type: Number,
    default: 1,
  },
});

const Activity = mongoose.model("activities", activitySchema);

export default Activity;
