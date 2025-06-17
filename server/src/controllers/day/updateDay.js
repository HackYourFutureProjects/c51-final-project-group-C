import Day from "../../models/Day.js";
import {
  getTripIfExists,
  checkUserIsOwner,
  checkDayBelongsToTrip,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const updateDay = async (req, res) => {
  try {
    const { tripId, dayId } = req.params;
    const { title } = req.body;
    const userId = req.user.userId;

    // 👇 Get trip and check ownership
    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);
    await checkDayBelongsToTrip(dayId, tripId);

    // 👇 Updating fields
    const updateFields = {};
    if (title) updateFields.title = title;

    const updatedDay = await Day.findByIdAndUpdate(dayId, updateFields, {
      new: true,
      runValidators: true,
    });

    await trip.save();

    res.status(200).json(updatedDay);
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
