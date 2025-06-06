import express from "express";

import { createDay } from "../controllers/day/createDay.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";
import { createDaySchema } from "../validation/schemas/daysSchema.js";
import { deleteDay } from "../controllers/day/deleteDay.js";

const dayRouter = express.Router({ mergeParams: true });

dayRouter.post(
  "/create-day",
  requireAuth,
  validate(createDaySchema),
  createDay,
);
dayRouter.delete("/:dayID", requireAuth, deleteDay);

export default dayRouter;
