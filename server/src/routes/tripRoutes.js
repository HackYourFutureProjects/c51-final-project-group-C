import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateData } from "../middleware/validateData.js";
import { createTrip } from "../controllers/trip/createTrip.js";
import { createTripModalSchema } from "../validation/schemas/tripSchemas.js";

const tripRouter = express.Router();

tripRouter.post(
  "/create-trip",
  requireAuth,
  validateData(createTripModalSchema),
  createTrip,
);

export default tripRouter;
