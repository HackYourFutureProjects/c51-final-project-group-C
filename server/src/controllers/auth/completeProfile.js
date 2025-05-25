import User from "../../models/User.js";
import { logError } from "../../util/logging.js";
import { generateJWT } from "../../util/generateJWT.js";
import { setJWTCookie } from "../../util/setJwtCookie.js";

export async function completeProfile(req, res) {
  const { name, surname, country } = req.body;
  const userId = req.user?.userId; // 👈 We take it from JWT

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!name || !surname || !country) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findById(userId);

    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: "User not verified or not found." });
    }

    user.name = name;
    user.surname = surname;
    user.country = country;

    await user.save();

    //👇 We regenerate JWT here to update `isProfileCompleted` flag in JWT token payload (check generateJWT function)
    const jwtToken = generateJWT(user);

    setJWTCookie(res, jwtToken);

    res.status(200).json({
      message: "Profile completed successfully.",
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error" });
  }
}
