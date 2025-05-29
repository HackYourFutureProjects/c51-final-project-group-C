import express from "express";

import { CreateDAy } from "../controllers/day/CreateDay.js";
// import { requireAuth } from "../middleware/requireAuth.js";
const dayRouter = express.Router({ mergeParams: true });

dayRouter.post("/create-day", CreateDAy);

export default dayRouter;
