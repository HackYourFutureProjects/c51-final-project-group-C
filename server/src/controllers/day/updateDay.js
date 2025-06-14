import Day from "../../models/Day.js";
import { logError } from "../../util/logging.js";

export const updateDay = async (req, res) => {
  const { dayID } = req.params;
  const { title, dayNumber } = req.body;

  try {
    const day = await Day.findById(dayID);
    if (!day) {
      return res.status(404).json({ error: "Day not found" });
    }

    // Check for duplicate dayNumber in the same trip
    if (dayNumber && dayNumber !== day.dayNumber) {
      const exists = await Day.findOne({
        tripID: day.tripID,
        dayNumber,
        _id: { $ne: dayID },
      });
      if (exists) {
        return res.status(400).json({
          message: "Day with this number already exists for this trip",
        });
      }
    }

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (dayNumber !== undefined) updateFields.dayNumber = dayNumber;

    const updatedDay = await Day.findByIdAndUpdate(dayID, updateFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedDay);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
