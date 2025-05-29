import express from "express";
import { CreateLocation } from "../controllers/location/createLocation.js";

// import { requireAuth } from "../middleware/requireAuth.js";
const locationRouter = express.Router({ mergeParams: true });

locationRouter.post("/create-location", CreateLocation);

export default locationRouter;
