import express from "express";

// Middleware

import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";

// Controllers

import { registerUser } from "../controllers/auth/register.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.js";
import { completeProfile } from "../controllers/auth/completeProfile.js";
import { login } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";
import { forgotPassword } from "../controllers/auth/forgotPassword.js";
import { resetPassword } from "../controllers/auth/resetPassword.js";
import { getCurrentUser } from "../controllers/auth/me.js";

// Validation Schemas

import {
  loginSchema,
  registrationSchema,
  completeProfileSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validation/schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", validate(registrationSchema), registerUser);
authRouter.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
authRouter.post(
  "/complete-profile",
  requireAuth,
  validate(completeProfileSchema),
  completeProfile,
);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword,
);
authRouter.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);
authRouter.get("/me", requireAuth, getCurrentUser);

export default authRouter;
