import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const toggleTripPublished = async (req, res) => {
  const { tripID } = req.params;

  try {
    const trip = await Trip.findById(tripID);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.published = !trip.published;
    const updatedTrip = await trip.save();

    res.status(200).json({ published: updatedTrip.published });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error" });
  }
};
