import Trip from "../../models/Trip.js";
import {
  getTripIfExists,
  checkUserIsOwner,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const publishTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.userId;

    // 👇 Check if trip exists and belongs to the current user
    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);

    // 👇 Populate 'days' field with full documents instead of just IDs
    const populatedTrip = await Trip.findById(tripId).populate({
      path: "days",
      populate: {
        path: "activities",
        populate: {
          path: "location",
        },
      },
    });

    // 👇 Check if trip has days
    if (!populatedTrip.days || populatedTrip.days.length === 0) {
      return res
        .status(400)
        .json({ message: "Cannot publish a trip without days" });
    }

    // 👇 Check for activities without title or location
    for (const day of populatedTrip.days) {
      if (!day.activities || day.activities.length === 0) {
        return res.status(400).json({
          message: `Day ${day.dayNumber} (${day.title}) has no activities. All days must have at least one activity.`,
        });
      }

      // 👇 Check for activities to have titles
      for (const activity of day.activities) {
        if (!activity.title || activity.title.trim() === "") {
          return res.status(400).json({
            message: `An activity in day ${day.dayNumber} (${day.title}) has no name. All activities must have a name.`,
          });
        }

        // 👇 Check for activities to have location
        if (!activity.location) {
          return res.status(400).json({
            message: `Activity "${activity.title}" in day ${day.dayNumber} (${day.title}) has no location. All activities must have a location.`,
          });
        }
      }
    }

    // 👇 And thne we set trip as published and save date of publication
    trip.isPublished = true;
    trip.datePublished = new Date();
    const updatedTrip = await trip.save();

    res.status(200).json({
      isPublished: updatedTrip.isPublished,
      datePublished: updatedTrip.datePublished,
    });
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
