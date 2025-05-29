import Trip from "../../models/Trip.js";

import { logError } from "../../util/logging.js";

export const completeTrip = async (req, res) => {
  const { startDate, endDate, days, tripID } = req.body;

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripID,
      {
        startDate,
        endDate,
        days,
      },
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
