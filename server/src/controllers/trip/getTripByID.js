import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const getTripById = async (req, res) => {
  const { tripID } = req.params;

  try {
    const trip = await Trip.findById(tripID)
      .populate({
        path: "days",
        populate: {
          path: "activities",
          populate: {
            path: "location",
          },
        },
      })
      .populate("userID", "name surname");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Convert Mongoose document to plain JS object
    const tripObj = trip.toObject();

    // Remove Mongo internal version key
    delete tripObj.__v;

    // Rename userID field to user for clearer API response
    tripObj.user = tripObj.userID;
    delete tripObj.userID;

    // Clean internal version key from user object if exists
    if (tripObj.user) {
      delete tripObj.user.__v;
    }

    // Ensure days exist and are an array before processing
    if (tripObj.days && Array.isArray(tripObj.days)) {
      // Sort days by their index for proper order
      tripObj.days.sort((a, b) => a.index - b.index);

      tripObj.days.forEach((day) => {
        // Remove internal __v key from each day
        delete day.__v;

        // If activities exist for the day, sort and clean them
        if (day.activities && Array.isArray(day.activities)) {
          // Sort activities alphabetically by name
          day.activities.sort((a, b) => a.name.localeCompare(b.name));

          // Rebuild each activity to order fields and clean unwanted ones
          day.activities = day.activities.map((activity) => {
            // Remove unwanted fields
            delete activity.__v;
            delete activity.day;

            // Clean location if it exists
            if (activity.location) {
              delete activity.location.__v;

              // Rename location.userID to location.user for clarity
              activity.location.user = activity.location.userID;
              delete activity.location.userID;
            }

            // Return a new activity object with ordered keys
            return {
              _id: activity._id,
              name: activity.name,
              notes: activity.notes,
              location: activity.location,
            };
          });
        }
      });
    }

    // Send the cleaned and ordered trip object
    res.status(200).json(tripObj);
  } catch (err) {
    // Handle errors gracefully and log them
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
