import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const deleteTrip = async (req, res) => {
  const { tripID } = req.params;
  try {
    const trip = await Trip.findById(tripID);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    // This triggers the cascading delete
    await trip.deleteOne();
    res.status(200).json({ message: "Trip and related data deleted" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
    logError(err);
  }
};
