import Day from "../../models/Day.js";

import { logError } from "../../util/logging.js";

export const createDay = async (req, res) => {
  const { title, index } = req.body;

  try {
    const newDay = new Day({
      title,
      index,
    });
    const savedDay = await newDay.save();
    res.status(200).json(savedDay);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
    logError(err);
  }
};
