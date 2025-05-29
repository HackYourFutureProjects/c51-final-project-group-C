import express from "express";

import { CreateDay } from "../controllers/day/CreateDay.js";
// import { requireAuth } from "../middleware/requireAuth.js";
const dayRouter = express.Router({ mergeParams: true });

dayRouter.post("/create-day", CreateDay);

export default dayRouter;
