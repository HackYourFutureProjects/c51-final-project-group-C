import express from "express";
import { createTrip } from "../controllers/trip/createTrip.js";
import { completeTrip } from "../controllers/trip/completeTrip.js";
import { getTripById } from "../controllers/trip/getTripByID.js";
// import { requireAuth } from "../middleware/requireAuth.js";

const tripRouter = express.Router();

tripRouter.post("/create-trip", createTrip);
tripRouter.post("/complete-trip", completeTrip);
tripRouter.get("/:tripID", getTripById);

export default tripRouter;
