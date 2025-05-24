import User from "../../models/User.js";
import { logError } from "../../util/logging.js";
import { generateJWT } from "../../util/generateJWT.js";
import { setJWTCookie } from "../../util/setJwtCookie.js";

export async function verifyEmail(req, res) {
  const { token } = req.body;

  if (!token) return res.status(400).json({ message: "Token is missing." });

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).json({ message: "Invalid token." });

    if (
      user.verificationTokenExpiresAt &&
      new Date() > user.verificationTokenExpiresAt
    ) {
      if (!user.isVerified) {
        await User.deleteOne({ _id: user._id });
        return res.status(400).json({ message: "Token has expired." });
      }
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    const jwtToken = generateJWT(user);

    setJWTCookie(res, jwtToken);

    res.status(200).json({
      message: "Email successfully verified. You are now logged in.",
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
        surname: user.surname || null,
        country: user.country || null,
      },
      profileComplete: Boolean(user.name && user.surname && user.country),
    });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error" });
  }
}
