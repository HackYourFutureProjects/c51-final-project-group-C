import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const getCities = async (req, res) => {
  try {
    // Get unique city names from the 'cities' field
    const cities = await Trip.distinct("cities", { isPublished: true });

    res.status(200).json(cities);
  } catch (error) {
    logError("Failed to get cities:", error);
    res.status(500).json({ message: "Server error " });
  }
};
