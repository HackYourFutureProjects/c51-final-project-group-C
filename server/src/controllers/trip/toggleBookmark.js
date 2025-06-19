import User from "../../models/User.js";
import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const toggleBookmark = async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found." });
    }

    const alreadyBookmarked = user.bookmarkedTrips.includes(tripId);

    // Removing/adding the trip from user collection and changing the timesBookmarked in the trip data
    if (alreadyBookmarked) {
      user.bookmarkedTrips.pull(tripId);
      trip.timesBookmarked = Math.max((trip.timesBookmarked || 1) - 1, 0);
    } else {
      user.bookmarkedTrips.push(tripId);
      trip.timesBookmarked = (trip.timesBookmarked || 0) + 1;
    }

    await user.save();
    await trip.save();

    res.status(200).json({
      message: alreadyBookmarked
        ? "Trip removed from bookmarks"
        : "Trip added to bookmarks",
    });
  } catch (error) {
    logError(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};
