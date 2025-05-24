import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { registerUser } from "../controllers/auth/register.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.js";
import { completeProfile } from "../controllers/auth/completeProfile.js";
import { login } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/complete-profile", requireAuth, completeProfile);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
