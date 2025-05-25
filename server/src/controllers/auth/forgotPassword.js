import User from "../../models/User.js";
import crypto from "crypto";
import { sendResetEmail } from "../../util/sendResetEmail.js";
import { logError } from "../../util/logging.js";

export async function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "This email does not exist." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before storing
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);

    user.resetToken = hashedResetToken;
    user.resetTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendResetEmail(email, resetToken);

    res.json({ message: "Please check your email to reset your password" });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error." });
  }
}
