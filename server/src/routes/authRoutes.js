import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { registerUser } from "../controllers/auth/register.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.js";
import { completeProfile } from "../controllers/auth/completeProfile.js";
import { login } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";
import { forgotPassword } from "../controllers/auth/forgotPassword.js";
import { resetPassword } from "../controllers/auth/resetPassword.js";
import { getCurrentUser } from "../controllers/auth/me.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/complete-profile", requireAuth, completeProfile);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.get("/me", requireAuth, getCurrentUser);

export default authRouter;
