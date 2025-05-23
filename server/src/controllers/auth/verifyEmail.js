import User from "../../models/User.js";
import { logError } from "../../util/logging.js";

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
    await user.save();

    res.json({ message: "Email successfully verified! You can now log in." });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error" });
  }
}
