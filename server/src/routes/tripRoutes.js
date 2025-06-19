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
import { publishTrip } from "../controllers/trip/publishTrip.js";
import { unpublishTrip } from "../controllers/trip/unpublishTrip.js";
import { copyTrip } from "../controllers/trip/copyTrip.js";
import { deleteTrip } from "../controllers/trip/deleteTrip.js";
import { getFilteredTrips } from "../controllers/trip/getFilteredTrips.js";
import { getPublishedTrips } from "../controllers/trip/getPublishedTrips.js";
import { toggleBookmark } from "../controllers/trip/toggleBookmark.js";

const tripRouter = express.Router();

// Get all published trips
tripRouter.get("/published", getPublishedTrips);

// Create trip
tripRouter.post(
  "/create-trip",
  requireAuth,
  validate(createTripModalSchema),
  createTrip,
);

// Update trip
tripRouter.patch(
  "/:tripId",
  requireAuth,
  validate(updateTripSchema),
  updateTrip,
);

// Publish and unpublish trip
tripRouter.put("/:tripId/publish", requireAuth, publishTrip);
tripRouter.put("/:tripId/unpublish", requireAuth, unpublishTrip);

// Copy trip
tripRouter.post("/:tripId/copy", requireAuth, copyTrip);

// Delete trip
tripRouter.delete("/:tripId", requireAuth, deleteTrip);

// Get specific trip
tripRouter.get("/:tripId", getTripById);

// Get Filtered Trips
tripRouter.get("/", getFilteredTrips);

// Toggle bookmarks
tripRouter.post("/:tripId/bookmark", requireAuth, toggleBookmark);

export default tripRouter;
