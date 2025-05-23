import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

// Create an express server
const app = express();

// Enable CORS for the frontend
app.use(cors());

// Tell express to use the json middleware
app.use(express.json());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter);

export default app;
