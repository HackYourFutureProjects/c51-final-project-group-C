import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { sendVerificationEmail } from "../../util/sendVerificationEmail.js";
import { logError } from "../../util/logging.js";

export async function registerUser(req, res) {
  try {
    const { email, password } = req.body;

    // Checking the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuid();
    const expiresIn = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration for token

    const newUser = new User({
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpiresAt: expiresIn,
    });

    await newUser.save();
    await sendVerificationEmail(email, verificationToken);

    res
      .status(201)
      .json({ message: "Success. Please check your email to proceed." });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error" });
  }
}
