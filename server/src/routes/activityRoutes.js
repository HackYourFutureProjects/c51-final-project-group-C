import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { createActivity } from "../controllers/activity/createActivity.js";
import { updateActivity } from "../controllers/activity/updateActivity.js";
import { deleteActivity } from "../controllers/activity/deleteActivity.js";
import { validate } from "../middleware/validateData.js";
import {
  createActivitySchema,
  updateActivitySchema,
} from "../validation/schemas/activitySchemas.js";

const activityRouter = express.Router({ mergeParams: true });

// Create activity
activityRouter.post(
  "/",
  requireAuth,
  validate(createActivitySchema),
  createActivity,
);

// Update activity
activityRouter.patch(
  "/:activityId",
  requireAuth,
  validate(updateActivitySchema),
  updateActivity,
);

// Delete activity
activityRouter.delete("/:activityId", requireAuth, deleteActivity);

export default activityRouter;
