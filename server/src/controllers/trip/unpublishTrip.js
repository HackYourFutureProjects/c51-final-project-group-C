import {
  getTripIfExists,
  checkUserIsOwner,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const unpublishTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.userId;

    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);

    trip.isPublished = false;
    const updatedTrip = await trip.save();

    res.status(200).json({ isPublished: updatedTrip.isPublished });
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
