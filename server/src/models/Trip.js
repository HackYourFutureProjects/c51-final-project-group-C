import mongoose from "mongoose";
import Day from "./Day.js";

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

// to delete all the days related to the trip
tripSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const days = await Day.find({ tripID: this._id });
      for (const day of days) {
        await day.deleteOne();
      }
      next();
    } catch (err) {
      next(err);
    }
  },
);
const Trip = mongoose.model("trips", tripSchema);

export default Trip;
