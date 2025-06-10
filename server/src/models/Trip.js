import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  countries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
  ],

  // User & Trip Content
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  coverPhotoUrl: { type: String, default: null },

  days: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "days",
    },
  ],

  // Creator Feedback
  creatorOverview: {
    type: String,
    trim: true,
  },
  creatorRating: {
    type: Number,
    min: 0,
    max: 5,
  },

  // Status & Metadata
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Trip = mongoose.model("trips", tripSchema);

export default Trip;
