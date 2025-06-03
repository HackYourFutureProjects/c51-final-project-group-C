import Trip from "../../models/Trip.js";

import { logError } from "../../util/logging.js";

export const completeTrip = async (req, res) => {
  //days is an array of the days id
  const { days } = req.body;
  const { tripID } = req.params;
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripID,
      { days },
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
