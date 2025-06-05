import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  coordinates: {
    lat: Number,
    lng: Number,
  },
  address: String,
  userIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
});

const Location = mongoose.model("locations", locationSchema);

export default Location;
