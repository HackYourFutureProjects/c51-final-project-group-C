import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
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
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  days: [{ type: mongoose.Schema.Types.ObjectId, ref: "days" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Trip = mongoose.model("trips", tripSchema);

export default Trip;
