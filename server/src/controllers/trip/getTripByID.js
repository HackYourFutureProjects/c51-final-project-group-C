import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const getTripById = async (req, res) => {
  const { tripID } = req.params;

  try {
    const trip = await Trip.findById(tripID)
      .populate({
        path: "days",
        populate: {
          path: "activities",
          populate: {
            path: "location",
          },
        },
      })

      .populate("userID", "name surname");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    const tripObj = trip.toObject();

    res.status(200).json(tripObj);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
