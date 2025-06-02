import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";
import { createActivity } from "../controllers/activity/createActivity.js";

const activityRouter = express.Router({ mergeParams: true });

activityRouter.post("/create-activity", requireAuth, createActivity);

export default activityRouter;
