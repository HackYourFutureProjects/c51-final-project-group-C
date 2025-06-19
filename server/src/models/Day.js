import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  dayNumber: {
    type: Number,
    required: true,
  },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "activities" }],
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trips",
    required: true,
  },
  order: {
    type: Number,
    default: function () {
      return this.dayNumber;
    },
  },
});

const Day = mongoose.model("days", daySchema);

export default Day;
