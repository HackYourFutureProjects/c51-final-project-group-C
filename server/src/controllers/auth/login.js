import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { logError } from "../../util/logging.js";
import { generateJWT } from "../../util/generateJWT.js";
import { setJwtCookie } from "../../util/setJwtCookie.js";

export async function login(request, response) {
  try {
    const { email, password } = request.body;

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

    setJwtCookie(response, jwtToken);

    response.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
        surname: user.surname || null,
        country: user.country || null,
      },
    });
  } catch (error) {
    logError(error);
    response.status(500).json({ message: "Server error" });
  }
}
