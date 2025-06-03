import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";
import { createTrip } from "../controllers/trip/createTrip.js";
import {
  completeTripSchema,
  createTripModalSchema,
} from "../validation/schemas/tripSchemas.js";
import { completeTrip } from "../controllers/trip/completeTrip.js";
import { getTripById } from "../controllers/trip/getTripByID.js";

const tripRouter = express.Router();

tripRouter.post(
  "/create-trip",
  requireAuth,
  validate(createTripModalSchema),
  createTrip,
);
tripRouter.post(
  "/complete-trip/:tripID",
  requireAuth,
  validate(completeTripSchema),
  completeTrip,
);
tripRouter.get("/:tripID", getTripById);

export default tripRouter;
