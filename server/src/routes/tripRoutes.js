import express from "express";
import { createTrip } from "../controllers/trip/createTrip.js";
import { requireAuth } from "../middleware/requireAuth.js";

const tripRouter = express.Router();

tripRouter.post("/create-trip", requireAuth, createTrip);

export default tripRouter;
