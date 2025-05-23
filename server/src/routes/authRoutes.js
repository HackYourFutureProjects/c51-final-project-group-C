import express from "express";
// import { createUser, getUsers } from "../controllers/user.js";
import { registerUser } from "../controllers/auth/register.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.js";
import { completeProfile } from "../controllers/auth/completeProfile.js";

const authRouter = express.Router();

// userRouter.get("/", getUsers);
// userRouter.post("/", createUser);
authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/complete-profile", completeProfile);

export default authRouter;
