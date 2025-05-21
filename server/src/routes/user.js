import express from "express";
import { createUser, getUsers } from "../controllers/user.js";
import { authController } from "../controllers/authController.js";
import { verifyEmail } from "../controllers/verifyEmail.js";
import { completeProfile } from "../controllers/completeProfile.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.post("/register", authController);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/complete-profile", completeProfile);

export default userRouter;
