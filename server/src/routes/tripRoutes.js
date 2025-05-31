import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";
import { createTrip } from "../controllers/trip/createTrip.js";
import { createTripModalSchema } from "../validation/schemas/tripSchemas.js";

const tripRouter = express.Router();

tripRouter.post(
  "/create-trip",
  requireAuth,
  validate(createTripModalSchema),
  createTrip,
);

export default tripRouter;
