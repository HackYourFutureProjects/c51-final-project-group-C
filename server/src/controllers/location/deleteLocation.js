import Location from "../../models/Location.js";
import { logError } from "../../util/logging.js";
export const deleteLocation = async (req, res) => {
  const { locationID } = req.params;

  try {
    const location = await Location.findById(locationID);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await location.deleteOne();

    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error" });
  }
};
