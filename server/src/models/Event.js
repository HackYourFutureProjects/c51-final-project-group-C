import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  day: { type: mongoose.Schema.Types.ObjectId, ref: "days" },
  notes: [{ Text: String }],
});

const event = mongoose.model("events", eventSchema);

export default event;
