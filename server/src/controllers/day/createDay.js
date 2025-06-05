import Day from "../../models/Day.js";
import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const createDay = async (req, res) => {
  const { title, dayNumber } = req.body;
  const { tripID } = req.params;

  try {
    // Check if the referenced trip exists
    const trip = await Trip.findById(tripID);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Check if the dayNumber already exists for this trip
    const existingDay = await Day.findOne({ tripID, dayNumber });
    if (existingDay) {
      return res
        .status(400)
        .json({ message: "Day with this number already exists for this trip" });
    }

    // Create a new day linked to the trip
    const newDay = new Day({ title, dayNumber, tripID });
    const savedDay = await newDay.save();

    // Push the new day's ID to the trip's days array and save
    trip.days.push(savedDay._id);
    await trip.save();

    res.status(201).json(savedDay);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
