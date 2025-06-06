import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { createActivity } from "../controllers/activity/createActivity.js";
import { validate } from "../middleware/validateData.js";
import { createActivitySchema } from "../validation/schemas/activitySchemas.js";
import { deleteActivity } from "../controllers/activity/deleteActivity.js";

const activityRouter = express.Router({ mergeParams: true });

activityRouter.post(
  "/create-activity",
  requireAuth,
  validate(createActivitySchema),
  createActivity,
);
activityRouter.delete("/:activityID", requireAuth, deleteActivity);

export default activityRouter;
