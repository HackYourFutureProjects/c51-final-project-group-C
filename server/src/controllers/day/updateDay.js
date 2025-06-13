import Day from "../../models/Day";
import { logError } from "../../util/logging";

export const updateDay = async (req, res) => {
  const { dayID } = req.params;
  const { title, dayNumber } = req.body;

  try {
    const updatedDay = await Day.findByIdAndUpdate(
      dayID,
      { title, dayNumber },
      { new: true, runValidators: true },
    );

    if (!updatedDay) {
      return res.status(404).json({ error: "Day not found" });
    }

    // Check for duplicate dayNumber in the same trip
    if (dayNumber && dayNumber !== Day.dayNumber) {
      const exists = await Day.findOne({ tripID: Day.tripID, dayNumber });
      if (exists) {
        return res.status(400).json({
          message: "Day with this number already exists for this trip",
        });
      }
    }

    res.status(200).json(updatedDay);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
