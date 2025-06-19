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
  cities: [
    {
      type: String,
      trim: true,
    },
  ],

  // User & Trip Content
  userId: {
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
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  datePublished: {
    type: Date,
    default: null,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },

  timesCopied: {
    type: Number,
    default: 0,
  },

  timesBookmarked: {
    type: Number,
    default: 0,
  },
});

// To automatically update lastUpdated field everytime the trip is being saved.

tripSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

const Trip = mongoose.model("trips", tripSchema);

export default Trip;
