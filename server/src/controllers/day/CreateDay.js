import day from "../../models/Day.js";
import { validate } from "../../util/handleValidation.js";
import { logError } from "../../util/logging.js";
import { dayValidationSchema } from "../../zodSchemas/dayValidation.js";

export const CreateDAy = async (req, res) => {
  const { tripID } = req.params;
  const { title, index } = req.body;
  const data = { tripID, title, index };
  try {
    validate(dayValidationSchema, data);
    const newDay = new day({
      title,
      index,
      tripID,
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
