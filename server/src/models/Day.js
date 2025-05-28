import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  index: {
    type: Number,
    required: true,
  },
  tripID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trips",
    required: true,
  },
});

const day = mongoose.model("days", daySchema);

export default day;
