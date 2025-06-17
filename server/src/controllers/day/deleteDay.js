import Day from "../../models/Day.js";
import Trip from "../../models/Trip.js";
import Activity from "../../models/Activity.js";
import {
  getTripIfExists,
  checkUserIsOwner,
  checkDayBelongsToTrip,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const deleteDay = async (req, res) => {
  try {
    const { tripId, dayId } = req.params;
    const userId = req.user.userId;

    // 👇 Get trip and check ownership
    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);
    const day = await checkDayBelongsToTrip(dayId, tripId);

    // 👇 Getting the number of the day we are removing to update other days
    const deletedDayNumber = day.dayNumber;

    // 👇 Removing all activities linked to this day
    await Activity.deleteMany({ day: dayId });

    // 👇 Removing day from days array in trip, and decreasing duration of a trip (-1)
    await Trip.findByIdAndUpdate(tripId, {
      $pull: { days: dayId },
      $inc: { duration: -1 },
    });

    // 👇 Removing day
    await Day.findByIdAndDelete(dayId);

    // 👇 Here we get remaining days, that have larger dayNumber than the one we are removing
    const daysToUpdate = await Day.find({
      tripId: tripId,
      dayNumber: { $gt: deletedDayNumber },
    }).sort({ dayNumber: 1 });

    // 👇 Updating numbers of days (-1)
    const updatePromises = daysToUpdate.map((dayToUpdate, index) => {
      const newDayNumber = deletedDayNumber + index;
      return Day.findByIdAndUpdate(dayToUpdate._id, {
        dayNumber: newDayNumber,
        title: dayToUpdate.title.replace(/Day \d+/, `Day ${newDayNumber}`),
        order: newDayNumber,
      });
    });

    // 👇 Wait for all updates to finish
    await Promise.all(updatePromises);

    res.status(200).json({
      message: "Day deleted and remaining days renumbered successfully",
      deletedDayId: dayId,
    });
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
