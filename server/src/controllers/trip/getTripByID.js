import Trip from "../../models/Trip.js";
import { logError } from "../../util/logging.js";

export const getTripById = async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId)
      .populate({
        path: "days",
        populate: {
          path: "activities",
          populate: {
            path: "location",
          },
        },
      })
      .populate("userId", "name surname _id profileImageUrl")
      .populate("countries");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Convert Mongoose document to plain JS object
    const tripObj = trip.toObject();

    // Remove Mongo internal version key
    delete tripObj.__v;

    // Rename userID field to user for clearer API response
    tripObj.user = tripObj.userId;
    if (tripObj.user) {
      tripObj.user.id = tripObj.user._id;
      delete tripObj.user.__v;
    }
    delete tripObj.userId;

    // Clean countries data if exists
    if (tripObj.countries && Array.isArray(tripObj.countries)) {
      tripObj.countries = tripObj.countries.map((country) => {
        if (country) {
          delete country.__v;
        }
        return country;
      });
    }

    // Ensure days exist and are an array before processing
    if (tripObj.days && Array.isArray(tripObj.days)) {
      // Sort days by their dayNumber for correct order
      tripObj.days.sort((a, b) => a.dayNumber - b.dayNumber);

      tripObj.days.forEach((day) => {
        // Remove internal __v key from each day
        delete day.__v;

        // If activities exist for the day, sort and clean them
        if (day.activities && Array.isArray(day.activities)) {
          // Sort activities alphabetically by title
          day.activities.sort((a, b) => a.title.localeCompare(b.title));

          // Rebuild each activity to order fields and clean unwanted ones
          day.activities = day.activities.map((activity) => {
            // Remove unwanted fields
            delete activity.__v;
            delete activity.day;

            // Clean location if it exists
            if (activity.location) {
              delete activity.location.__v;

              // Rename location.userID to location.user for clarity
              if (activity.location.userId) {
                activity.location.user = activity.location.userId;
                if (activity.location.user) {
                  activity.location.user.id = activity.location.user._id;
                }
                delete activity.location.userID;
              }
            }

            // Return a new activity object with ordered keys
            return {
              _id: activity._id,
              title: activity.title,
              notes: activity.notes,
              price: activity.price,
              rating: activity.rating,
              location: activity.location,
              activityPhotoUrls: activity.activityPhotoUrls || [],
            };
          });
        }
      });
    }

    // Send the cleaned and ordered trip object
    res.status(200).json(tripObj);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.message || "Server error" });
    logError(err);
  }
};
