import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getUserById } from "../controllers/users/getUserById.js";
import { getCurrentUser } from "../controllers/auth/me.js";

const userRouter = express.Router();

// 👇 Protected route for user's own profile
userRouter.get("/me", requireAuth, getCurrentUser);
// 👇 Public route for user's profile view
userRouter.get("/:id", getUserById);

export default userRouter;
