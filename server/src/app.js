import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import tripRouter from "./routes/tripRoutes.js";
import countryRouter from "./routes/countryRoutes.js";

// Create an express server
const app = express();

// Enable CORS for the frontend
app.use(cors());
app.use(cookieParser());

// Tell express to use the json middleware
app.use(express.json());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter);
app.use("/api/trip", tripRouter);
app.use("/api/country", countryRouter);

export default app;
