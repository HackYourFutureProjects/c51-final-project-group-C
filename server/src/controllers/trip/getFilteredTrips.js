import Trip from "../../models/Trip.js";
import { logError, logInfo } from "../../util/logging.js";

export const getFilteredTrips = async (req, res) => {
  try {
    const {
      country,
      cities,
      duration,
      title,
      sort,
      skip = 0,
      limit = 20,
    } = req.query;

    const filter = { isPublished: true };

    if (country) {
      const countryIDs = country.split(",");
      filter.countries = { $in: countryIDs };
    }
    if (cities) {
      const citiesArray = cities.split(",").map((c) => c.trim());
      filter.cities = { $in: citiesArray };
    }

    if (duration) {
      const [min, max] = duration.split("-").map(Number);
      filter.duration = { $gte: min, $lte: max };
    }

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    let sortOption = {};
    if (sort === "rating") sortOption.creatorRating = -1;
    else if (sort === "duration") sortOption.duration = -1;

    const filteredTrips = await Trip.find(filter)
      .sort(sortOption)
      .skip(Number(skip))
      .limit(Number(limit))
      .populate("countries")
      .populate("userId", "name surname");

    res.json(filteredTrips);
    logInfo(filteredTrips);
  } catch (error) {
    logError(error);
    res.status(500).json({ error: "Server error" });
  }
};
