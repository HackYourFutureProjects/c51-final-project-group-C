import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  day: { type: mongoose.Schema.Types.ObjectId, ref: "days" },
  notes: [{ index: Number, text: String }],
  location: { type: mongoose.Schema.Types.ObjectId, ref: "locations" },
});

const event = mongoose.model("events", eventSchema);

export default event;
