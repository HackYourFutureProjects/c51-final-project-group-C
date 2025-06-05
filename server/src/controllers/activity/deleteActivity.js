import Activity from "../../models/Activity.js";
import { logError } from "../../util/logging.js";

export const deleteActivity = async (req, res) => {
  const { activityID } = req.params;
  try {
    const activity = await Activity.findById(activityID);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });
    //  triggers location delete
    await activity.deleteOne();
    res.json({ message: "Activity and its location deleted" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
    logError(err);
  }
};
