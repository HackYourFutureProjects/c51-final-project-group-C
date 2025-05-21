import User from "../models/User";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { sendVerificationEmail } from "../util/sendVerificationEmail";

export async function registerUser(req, res) {
  try {
    const { email, password } = req.body;

    // Checking the email/password provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }

    // Checking the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password length check
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Checking the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuid();

    const newUser = new User({
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    await newUser.save();
    await sendVerificationEmail(email, verificationToken);

    res
      .status(201)
      .json({ message: "Success. Please check your email to proceed." });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
