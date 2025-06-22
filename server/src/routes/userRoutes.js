import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getUserById } from "../controllers/users/getUserById.js";
import { getCurrentUser } from "../controllers/auth/me.js";
import { getBookmarkedTrips } from "../controllers/users/getBookmarkedTrips.js";
import { getUserPublishedTrips } from "../controllers/users/getUserPublishedTrips.js";
import { getUserDraftTrips } from "../controllers/users/getUserDraftTrips.js";

const userRouter = express.Router();

// 👇 Protected route for user's own profile
userRouter.get("/me", requireAuth, getCurrentUser);
// 👇 Public route for user's profile view
userRouter.get("/:id", getUserById);

// Get users bookmarked trips
userRouter.get("/me/bookmarks", requireAuth, getBookmarkedTrips);

// Protected route - get draft trips for current user (for own profile page)
userRouter.get("/me/drafts", requireAuth, getUserDraftTrips);

// Public route - get published trips for a user by ID
userRouter.get("/:userId/trips", getUserPublishedTrips);

export default userRouter;
