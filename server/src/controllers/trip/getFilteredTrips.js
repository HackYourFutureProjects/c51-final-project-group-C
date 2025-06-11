import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const getFilteredTrips = async (req, res) => {
  try {
    const {
      country,
      city,
      duration,
      title,
      sort,
      skip = 0,
      limit = 20,
    } = req.query;

    const filter = { published: true };

    if (country) {
      const countryIDs = country.split(",");
      filter.countries = { $in: countryIDs };
    }

    if (city) {
      const cities = city.split(",");
      filter.city = { $in: cities };
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
      .populate("countries");

    res.json(filteredTrips);
  } catch (error) {
    logError(error);
    res.status(500).json({ error: "Server error" });
  }
};
