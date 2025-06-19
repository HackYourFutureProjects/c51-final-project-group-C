import Activity from "../../models/Activity.js";
import {
  getTripIfExists,
  checkUserIsOwner,
  checkDayBelongsToTrip,
  checkActivityBelongsToDay,
  updateTripCities,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const updateActivity = async (req, res) => {
  try {
    const { tripId, dayId, activityId } = req.params;
    const {
      title,
      location,
      notes,
      price,
      rating,
      activityPhotoUrls,
      activityNumber,
      order,
    } = req.body;
    const userId = req.user.userId;

    // 👇Get trip and check ownership
    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);
    await checkDayBelongsToTrip(dayId, tripId);
    await checkActivityBelongsToDay(activityId, dayId);

    // 👇 Collect fields to update that were provided in request body
    const updateFields = {};

    if (title) updateFields.title = title;
    if (location) updateFields.location = location;
    if (notes !== undefined) updateFields.notes = notes;
    if (price !== undefined) updateFields.price = price;
    if (rating !== undefined) updateFields.rating = rating;
    if (activityPhotoUrls) updateFields.activityPhotoUrls = activityPhotoUrls;
    if (activityNumber !== undefined)
      updateFields.activityNumber = activityNumber;
    if (order !== undefined) updateFields.order = order;

    // 👇 Update activity
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      updateFields,
      { new: true, runValidators: true },
    );

    // 👇 If location was updated, update the trip cities array
    if (location) {
      await updateTripCities(tripId);
    }

    // 👇 Update 'last updated field' - trip will be saved with pre-save hook handling lastUpdated
    await trip.save();

    res.status(200).json(updatedActivity);
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
