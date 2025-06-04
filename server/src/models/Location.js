import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  coordinates: {
    lat: Number,
    lng: Number,
  },
  address: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const location = mongoose.model("locations", locationSchema);

export default location;
