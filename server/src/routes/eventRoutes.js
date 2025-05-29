import express from "express";
import { CreateEvent } from "../controllers/event/createEvent.js";

// import { requireAuth } from "../middleware/requireAuth.js";
const eventRouter = express.Router({ mergeParams: true });

eventRouter.post("/create-event", CreateEvent);

export default eventRouter;
