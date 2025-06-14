import Location from "../../models/Location.js";
import { logError } from "../../util/logging.js";

export const updateLocation = async (req, res) => {
  const { locationID } = req.params;
  const { coordinates, address } = req.body;

  try {
    const updateFields = {};

    if (coordinates !== undefined) updateFields.coordinates = coordinates;
    if (address !== undefined) updateFields.address = address;

    const updatedLocation = await Location.findByIdAndUpdate(
      locationID,
      updateFields,
      { new: true, runValidators: true },
    );

    if (!updatedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.status(200).json(updatedLocation);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
