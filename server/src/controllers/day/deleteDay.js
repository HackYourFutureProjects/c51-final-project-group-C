import Day from "../../models/Day.js";
import { logError } from "../../util/logging.js";

export const deleteDay = async (req, res) => {
  const { dayID } = req.params;
  try {
    const day = await Day.findById(dayID);
    if (!day) return res.status(404).json({ message: "Day not found" });
    // This triggers deleting its activities
    await day.deleteOne();
    res.status(200).json({ message: "Day and related activities deleted" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
    logError(err);
  }
};
