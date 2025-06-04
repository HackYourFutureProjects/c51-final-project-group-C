import Location from "../../models/Location.js";
import Activity from "../../models/Activity.js";
import { logError } from "../../util/logging.js";

export const createLocation = async (req, res) => {
  //    example of the body {
  //   "coordinates": {
  //     "lat": 40.7128,
  //     "lng": -74.0060
  //   },
  //   "address": "123 Main St, New York, NY"
  // }
  const { coordinates, address } = req.body;
  const { activityID } = req.params;
  const userID = req.user.userId;

  try {
    const newLocation = new Location({
      coordinates,
      address,
      userID,
    });

    const savedLocation = await newLocation.save();

    if (activityID) {
      await Activity.findByIdAndUpdate(activityID, {
        location: savedLocation._id,
      });
    }

    res.status(200).json(savedLocation);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
