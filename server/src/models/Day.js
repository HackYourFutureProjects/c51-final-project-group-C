import mongoose from "mongoose";
import Activity from "./Activity.js";
import Trip from "./Trip.js";
import { logError } from "../util/logging.js";

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
  tripID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trips",
    required: true,
  },
});
// 1-to delete all activities related to that day
daySchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Activity.deleteMany({ day: this._id });
      next();
    } catch (err) {
      next(err);
    }
  },
);

// 2-update the trip duration after the day is deleted
daySchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    try {
      const tripID = this.tripID;

      // Count remaining days for the trip
      const remainingDaysCount = await mongoose
        .model("days")
        .countDocuments({ tripID });

      // Update the trip duration accordingly
      await Trip.findByIdAndUpdate(tripID, { duration: remainingDaysCount });
    } catch (err) {
      logError(err);
    }
  },
);
const day = mongoose.model("days", daySchema);

export default day;
