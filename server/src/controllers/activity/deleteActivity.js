import Activity from "../../models/Activity.js";
import Day from "../../models/Day.js";
import {
  getTripIfExists,
  checkUserIsOwner,
  checkDayBelongsToTrip,
  checkActivityBelongsToDay,
  updateTripCities,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const deleteActivity = async (req, res) => {
  try {
    const { tripId, dayId, activityId } = req.params;
    const userId = req.user.userId;

    // 👇 Get trip if it exists
    const trip = await getTripIfExists(tripId);

    // 👇 Check if user is the owner of the trip
    checkUserIsOwner(trip, userId);

    // 👇 Check if day belongs to trip
    await checkDayBelongsToTrip(dayId, tripId);

    // 👇 Check if activity belongs to day
    const activity = await checkActivityBelongsToDay(activityId, dayId);

    // 👇 Save order and activityNumber values of the activity we're deleting
    const deletedActivityOrder = activity.order;
    const deletedActivityNumber = activity.activityNumber;

    // 👇 Remove activity from the day's activities array
    await Day.findByIdAndUpdate(dayId, {
      $pull: { activities: activityId },
    });

    // 👇 Delete the activity itself
    await Activity.findByIdAndDelete(activityId);

    // 👇 Here we get all remaining activities of the day, that have higher order than deleted one
    const activitiesToUpdate = await Activity.find({
      day: dayId,
      order: { $gt: deletedActivityOrder },
    }).sort({ order: 1 });

    // 👇 And then we update their order and activityNumber
    const updatePromises = activitiesToUpdate.map((activityToUpdate, index) => {
      const newOrder = deletedActivityOrder + index;
      const newActivityNumber = deletedActivityNumber + index;
      return Activity.findByIdAndUpdate(activityToUpdate._id, {
        order: newOrder,
        activityNumber: newActivityNumber,
      });
    });

    // 👇 Wait for all updates to be completed
    await Promise.all(updatePromises);

    // 👇 Update trip cities array after activity deletion
    await updateTripCities(tripId);

    // 👇 Update 'last updated' field in Trip - trip will be saved with pre-save hook handling lastUpdated
    await trip.save();

    res.status(200).json({
      message: `Activity with id ${activityId} deleted successfully.`,
    });
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
