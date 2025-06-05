import express from "express";
import { createLocation } from "../controllers/location/createLocation.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";
import { createLocationSchema } from "../validation/schemas/locationSchemas.js";
import { deleteLocation } from "../controllers/location/deleteLocation.js";

const locationRouter = express.Router({ mergeParams: true });

locationRouter.post(
  "/create-location",
  requireAuth,
  validate(createLocationSchema),
  createLocation,
);
locationRouter.delete("/:locationID", requireAuth, deleteLocation);

export default locationRouter;
