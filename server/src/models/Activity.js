import mongoose from "mongoose";
import Location from "./Location.js";

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  day: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "days",
  },
  notes: {
    noteNumber: Number,
    text: String,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
  },
  price: {
    type: Number,
    min: 0,
    // optional: assume free if not provided
    default: 0,
  },
});
// to delete the location that is related to the activity
activitySchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      if (this.location) {
        await Location.findByIdAndDelete(this.location);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
);
const activity = mongoose.model("activities", activitySchema);

export default activity;
