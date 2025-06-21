import Trip from "../../models/Trip.js";
import Day from "../../models/Day.js";
import Activity from "../../models/Activity.js";
import User from "../../models/User.js";
import {
  getTripIfExists,
  checkUserIsOwner,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.userId;

    // 👇 Check if the trip exists and belongs to the user
    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);

    // 👇 Find days linked to the trip
    const days = await Day.find({ tripId });

    // 👇 Get ids of the days (to remove activities linked to these days)
    const dayIds = days.map((day) => day._id);

    // 👇 Removing activities
    if (dayIds.length > 0) {
      await Activity.deleteMany({ day: { $in: dayIds } });
    }

    // 👇 Removing days
    await Day.deleteMany({ tripId });

    // 👇 Removing the whole trip
    await Trip.findByIdAndDelete(tripId);

    // Remove the trip from users bookmarked trips array
    await User.updateMany(
      { bookmarkedTrips: tripId },
      { $pull: { bookmarkedTrips: tripId } },
    );

    res.status(200).json({
      message: "Trip deleted successfully with all related days and activities",
      deletedTripId: tripId,
    });
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
