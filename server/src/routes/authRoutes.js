import express from "express";
import { createUser, getUsers } from "../controllers/user.js";
import { registerUser } from "../controllers/registration/signup.js";
import { verifyEmail } from "../controllers/registration/verifyEmail.js";
import { completeProfile } from "../controllers/registration/completeProfile.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/complete-profile", completeProfile);

export default userRouter;
