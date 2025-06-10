import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const getFilteredTrips = async (req, res) => {
  try {
    const { country, city, duration, title, sort } = req.query;
    // get only published trips
    const filter = { published: true };

    // Country filter (multiple)
    if (country) {
      const countryIDs = country.split(","); // e.g., ["Netherlands", "Germany"]
      filter.countries = { $in: countryIDs };
    }

    // City filter (multiple)
    if (city) {
      const cities = city.split(","); // e.g., ["Amsterdam", "Berlin"]
      filter.city = { $in: cities };
    }

    // Duration filter (range)
    if (duration) {
      const [min, max] = duration.split("-").map(Number);
      filter.duration = { $gte: min, $lte: max };
    }

    // Title filter (case-insensitive partial match)
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    // Sorting
    let sortOption = {};
    if (sort === "rating") sortOption.rating = -1;
    else if (sort === "duration") sortOption.duration = -1;

    const filteredTrips = await Trip.find(filter)
      .sort(sortOption)
      .populate("countries");

    res.json(filteredTrips);
  } catch (error) {
    logError(error);
    res.status(500).json({ error: "Server error" });
  }
};
