import Activity from "../../models/Activity.js";
import Day from "../../models/Day.js";
import { logError } from "../../util/logging.js";

export const createActivity = async (req, res) => {
  const { name, notes, price } = req.body;
  const { dayID } = req.params;

  try {
    const newActivity = new Activity({
      name,
      notes,
      price,
      day: dayID,
    });

    const savedActivity = await newActivity.save();

    // Link activity to the day
    await Day.findByIdAndUpdate(dayID, {
      $push: { activities: savedActivity._id },
    });

    res.status(201).json(savedActivity);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
