import express from "express";

import { createDay } from "../controllers/day/createDay.js";
import { updateDay } from "../controllers/day/updateDay.js";
import { deleteDay } from "../controllers/day/deleteDay.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";
import {
  createDaySchema,
  updateDaySchema,
} from "../validation/schemas/daysSchema.js";

const dayRouter = express.Router({ mergeParams: true });

// Create day
dayRouter.post("/", requireAuth, validate(createDaySchema), createDay);

// Update day
dayRouter.patch("/:dayId", requireAuth, validate(updateDaySchema), updateDay);

// Delete day
dayRouter.delete("/:dayId", requireAuth, deleteDay);

export default dayRouter;
