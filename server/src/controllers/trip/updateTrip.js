import Trip from "../../models/Trip.js";
import {
  getTripIfExists,
  checkUserIsOwner,
  validateCountries,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const {
      title,
      countries,
      cities,
      creatorOverview,
      creatorRating,
      coverPhotoUrl,
    } = req.body;

    const userId = req.user.userId;

    // 👇 Get trip if it exists in database and check if user is the owner
    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);

    // 👇 Validate if provided countries exist in database
    if (countries && countries.length > 0) {
      await validateCountries(countries);
    }

    // 👇 Collect updated fields
    const updateFields = {};
    if (title) updateFields.title = title;
    if (countries && countries.length > 0) updateFields.countries = countries;
    if (cities !== undefined) updateFields.cities = req.body.cities;
    if (creatorOverview !== undefined)
      updateFields.creatorOverview = creatorOverview;
    if (creatorRating !== undefined) updateFields.creatorRating = creatorRating;
    if (coverPhotoUrl !== undefined) updateFields.coverPhotoUrl = coverPhotoUrl;

    const updatedTrip = await Trip.findByIdAndUpdate(tripId, updateFields, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "countries",
        select: "name code",
      })
      .populate("days");

    res
      .status(200)
      .json({ message: "Trip updated successfully", trip: updatedTrip });
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
