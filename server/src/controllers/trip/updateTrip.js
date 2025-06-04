import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const updateTrip = async (req, res) => {
  const { creatorOverview, creatorRating } = req.body;
  const { tripID } = req.params;

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripID,
      { creatorOverview, creatorRating },
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedTrip);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
