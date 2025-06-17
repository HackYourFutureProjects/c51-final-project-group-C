import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    placeId: {
      type: String,
    },
  },
  { _id: false },
);

export default locationSchema;
