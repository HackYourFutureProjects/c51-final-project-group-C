import mongoose from "mongoose";
import Activity from "./Activity";

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
// to delete all activities related to that day
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
const day = mongoose.model("days", daySchema);

export default day;
