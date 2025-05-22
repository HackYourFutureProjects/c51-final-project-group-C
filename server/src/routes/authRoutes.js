import express from "express";
// import { createUser, getUsers } from "../controllers/user.js";
import { registerUser } from "../controllers/registration/signup.js";
import { verifyEmail } from "../controllers/registration/verifyEmail.js";
import { completeProfile } from "../controllers/registration/completeProfile.js";

const authRouter = express.Router();

// userRouter.get("/", getUsers);
// userRouter.post("/", createUser);
authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/complete-profile", completeProfile);

export default authRouter;
