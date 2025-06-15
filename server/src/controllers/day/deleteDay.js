import Day from "../../models/Day.js";
import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const deleteDay = async (req, res) => {
  const { dayID } = req.params;
  try {
    const day = await Day.findById(dayID);
    if (!day) return res.status(404).json({ message: "Day not found" });

    const tripId = day.tripID;
    // This triggers deleting its activities
    await day.deleteOne();

    // Remove the dayId from the Trip's 'days' array
    await Trip.findByIdAndUpdate(tripId, {
      $pull: { days: dayID },
    });

    res.status(200).json({ message: "Day and related activities deleted" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
    logError(err);
  }
};
