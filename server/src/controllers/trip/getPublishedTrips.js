import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const getPublishedTrips = async (req, res) => {
  try {
    const publishedTrips = await Trip.find({ isPublished: true })
      .populate("userId", "name surname _id profileImageUrl")
      .populate("countries", "name code")
      .sort({ datePublished: -1 }); // Sort by date (new first)

    // 👇 Convert mongoose documents to JS objects
    const formattedTrips = publishedTrips.map((trip) => {
      const tripObj = trip.toObject();

      // 👇 Renaming userId to user for clearer API-response
      tripObj.user = tripObj.userId;
      delete tripObj.userId;

      // 👇 Removing version keys
      delete tripObj.__v;
      if (tripObj.user) {
        delete tripObj.user.__v;
      }

      // 👇 Also clean them in countries (__v)
      if (tripObj.countries && Array.isArray(tripObj.countries)) {
        tripObj.countries = tripObj.countries.map((country) => {
          if (country) {
            delete country.__v;
          }
          return country;
        });
      }

      return tripObj;
    });

    res.status(200).json(formattedTrips);
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error" });
  }
};
