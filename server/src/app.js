import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import tripRouter from "./routes/tripRoutes.js";
import countryRouter from "./routes/countryRoutes.js";
import dayRouter from "./routes/dayRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import locationRouter from "./routes/locationRoutes.js";

// Create an express server
const app = express();

// Enable CORS for the frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

// Tell express to use the json middleware
app.use(express.json());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/trip", tripRouter);
app.use("/api/country", countryRouter);
app.use("/api/user/:userID/trip/:tripID/days", dayRouter);
app.use("/api/user/:userID/trip/:tripID/day/:dayID/events", eventRouter);
app.use(
  "/api/user/:userID/trip/:tripID/day/:dayID/event/:eventID/locations",
  locationRouter,
);

export default app;
