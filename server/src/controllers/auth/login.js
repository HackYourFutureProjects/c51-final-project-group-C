import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { logError } from "../../util/logging.js";
import { generateJWT } from "../../util/generateJWT.js";

export async function login(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "Email and password are required!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return response.status(401).json({
        message: "Please verify your email before logging in",
        isVerified: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    const jwtToken = generateJWT(user);

    const isProduction = process.env.NODE_ENV === "production";

    response.cookie("jwt", jwtToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 👈 One day
    });

    response.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    logError(error);
    response.status(500).json({ message: "Server error" });
  }
}
