import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const updateTrip = async (req, res) => {
  const {
    title,
    duration,
    countries,
    coverPhotoUrl,
    creatorOverview,
    creatorRating,
  } = req.body;
  const { tripID } = req.params;

  try {
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (duration !== undefined) updateFields.duration = duration;
    if (countries !== undefined) updateFields.countries = countries;
    if (coverPhotoUrl !== undefined) updateFields.coverPhotoUrl = coverPhotoUrl;
    if (creatorOverview !== undefined)
      updateFields.creatorOverview = creatorOverview;
    if (creatorRating !== undefined) updateFields.creatorRating = creatorRating;

    const updatedTrip = await Trip.findByIdAndUpdate(tripID, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.status(200).json(updatedTrip);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
