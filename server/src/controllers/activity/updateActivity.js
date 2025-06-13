import Activity from "../../models/Activity.js";
import { logError } from "../../util/logging.js";

export const updateActivity = async (req, res) => {
  const { activityID } = req.params;
  const { name, price, notes, activityPhotoUrls } = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityID,
      { name, price, notes, activityPhotoUrls },
      { new: true, runValidators: true },
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.status(200).json(updatedActivity);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
