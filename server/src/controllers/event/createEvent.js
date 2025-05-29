import day from "../../models/Day.js";
import Event from "../../models/Event.js";
import location from "../../models/Location.js";

import { logError } from "../../util/logging.js";

export const CreateEvent = async (req, res) => {
  const { name, notes, coordinates, address } = req.body;
  const { dayID, userID } = req.params;

  try {
    const newLocation = new location({
      coordinates,
      address,
      userID,
    });
    const savedLocation = await newLocation.save();
    const newEvent = new Event({
      name,
      notes,
      day: dayID,
      locations: savedLocation._id,
    });
    const savedEvent = await newEvent.save();

    // to update the array in day schema with the eventID
    await day.findByIdAndUpdate(dayID, {
      $push: { events: savedEvent._id },
    });

    res.status(200).json({ event: savedEvent, location: savedLocation });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
