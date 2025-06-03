import express from "express";
import { createLocation } from "../controllers/location/createLocation.js";
import { requireAuth } from "../middleware/requireAuth.js";

const locationRouter = express.Router({ mergeParams: true });

locationRouter.post("/create-location", requireAuth, createLocation);

export default locationRouter;
