import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";
import { createTrip } from "../controllers/trip/createTrip.js";
import {
  createTripModalSchema,
  saveTripSchema,
} from "../validation/schemas/tripSchemas.js";
import { saveTrip } from "../controllers/trip/saveTrip.js";
import { getTripById } from "../controllers/trip/getTripByID.js";
import { toggleTripPublished } from "../controllers/trip/publishTrip.js";

const tripRouter = express.Router();

tripRouter.post(
  "/create-trip",
  requireAuth,
  validate(createTripModalSchema),
  createTrip,
);
tripRouter.post(
  "/save-trip/:tripID",
  requireAuth,
  validate(saveTripSchema),
  saveTrip,
);
tripRouter.put("/publish/:tripID", requireAuth, toggleTripPublished);
tripRouter.get("/:tripID", getTripById);

export default tripRouter;
