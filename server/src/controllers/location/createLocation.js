import location from "../../models/Location.js";

import { logError } from "../../util/logging.js";

export const CreateLocation = async (req, res) => {
  const { coordinates, address } = req.body;
  const { userID } = req.params;

  try {
    const newLocation = new location({
      coordinates,
      address,
      userID,
    });
    const savedLocation = await newLocation.save();
    res.status(200).json(savedLocation);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
