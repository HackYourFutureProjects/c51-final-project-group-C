import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";
import { createTrip } from "../controllers/trip/createTrip.js";
import {
  createTripModalSchema,
  updateTripSchema,
} from "../validation/schemas/tripSchemas.js";
import { updateTrip } from "../controllers/trip/updateTrip.js";
import { getTripById } from "../controllers/trip/getTripByID.js";
import { toggleTripPublished } from "../controllers/trip/publishTrip.js";
import { deleteTrip } from "../controllers/trip/deleteTrip.js";

const tripRouter = express.Router();

tripRouter.post(
  "/create-trip",
  requireAuth,
  validate(createTripModalSchema),
  createTrip,
);
tripRouter.put("/:tripID", requireAuth, validate(updateTripSchema), updateTrip);
tripRouter.put("/publish/:tripID", requireAuth, toggleTripPublished);
tripRouter.get("/:tripID", getTripById);
tripRouter.delete("/:tripID", requireAuth, deleteTrip);

export default tripRouter;
