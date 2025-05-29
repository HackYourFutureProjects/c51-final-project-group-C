import Event from "../../models/Event.js";

import { logError } from "../../util/logging.js";

export const CreateEvent = async (req, res) => {
  const { name, notes } = req.body;
  const { dayID } = req.params;

  try {
    const newEvent = new Event({
      name,
      notes,
      dayID,
    });
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
