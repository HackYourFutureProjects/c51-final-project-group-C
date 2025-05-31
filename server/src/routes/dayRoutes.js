import express from "express";

import { createDay } from "../controllers/day/createDay.js";
import { requireAuth } from "../middleware/requireAuth.js";

const dayRouter = express.Router({ mergeParams: true });

dayRouter.post("/create-day", requireAuth, createDay);

export default dayRouter;
