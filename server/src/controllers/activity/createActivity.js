import Activity from "../../models/Activity.js";
import Day from "../../models/Day.js";
import {
  getTripIfExists,
  checkUserIsOwner,
  checkDayBelongsToTrip,
  getNextActivityOrder,
  getNextActivityNumber,
  updateTripCities,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const createActivity = async (req, res) => {
  try {
    const { title, location, notes, price, rating, activityPhotoUrls } =
      req.body;
    const { tripId, dayId } = req.params;
    const userId = req.user.userId;

    // 👇 Get trip and check ownership
    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);
    await checkDayBelongsToTrip(dayId, tripId);

    // 👇 Using utility to get next activity order and number
    const nextOrder = await getNextActivityOrder(dayId);
    const nextActivityNumber = await getNextActivityNumber(dayId);

    // 👇 Create new activity
    const newActivity = new Activity({
      title,
      location,
      notes,
      price,
      rating,
      activityPhotoUrls: activityPhotoUrls || [],
      day: dayId,
      order: nextOrder,
      activityNumber: nextActivityNumber,
    });

    const savedActivity = await newActivity.save();

    // 👇 Link activity with a day
    await Day.findByIdAndUpdate(dayId, {
      $push: { activities: savedActivity._id },
    });

    // 👇 Update the trip cities array
    if (location && location.city) {
      await updateTripCities(tripId);
    }

    // 👇 Update 'last updated' date - trip will be saved with pre-save hook handling lastUpdated
    await trip.save();

    res.status(201).json(savedActivity);
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
