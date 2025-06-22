import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const getUserDraftTrips = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 👇 Find all unpublished trips for the currentuser
    const draftTrips = await Trip.find({
      userId,
      isPublished: false,
    })
      .populate("userId", "name surname _id profileImageUrl")
      .populate("countries", "name code")
      .sort({ lastUpdated: -1 });

    // 👇 Convert mongoose documents to JS objects
    const formattedTrips = draftTrips.map((trip) => {
      const tripObj = trip.toObject();

      tripObj.user = tripObj.userId;
      delete tripObj.userId;

      // 👇  Removing version keys
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

    res.status(200).json({ trips: formattedTrips });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error" });
  }
};
