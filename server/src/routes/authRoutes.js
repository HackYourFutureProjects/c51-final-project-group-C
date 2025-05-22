import express from "express";
// import { createUser, getUsers } from "../controllers/user.js";
import { registerUser } from "../controllers/authorization/register.js";
import { verifyEmail } from "../controllers/authorization/verifyEmail.js";
import { completeProfile } from "../controllers/authorization/completeProfile.js";

const authRouter = express.Router();

// userRouter.get("/", getUsers);
// userRouter.post("/", createUser);
authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/complete-profile", completeProfile);

export default authRouter;
