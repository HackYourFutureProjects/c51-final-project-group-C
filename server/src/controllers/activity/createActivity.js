import Activity from "../../models/Activity.js";
import Day from "../../models/Day.js";

import Location from "../../models/Location.js";

import { logError } from "../../util/logging.js";

export const createActivity = async (req, res) => {
  const { name, notes, coordinates, address } = req.body;
  const { dayID } = req.params;
  const userID = req.user.userId;

  try {
    const newLocation = new Location({
      coordinates,
      address,
      userID,
    });
    const savedLocation = await newLocation.save();
    const newActivity = new Activity({
      name,
      notes,
      day: dayID,
      location: savedLocation._id,
    });
    const savedActivity = await newActivity.save();

    // to update the array in day schema with the eventID
    await Day.findByIdAndUpdate(dayID, {
      $push: { activities: savedActivity._id },
    });

    res.status(200).json({ activity: savedActivity, location: savedLocation });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
