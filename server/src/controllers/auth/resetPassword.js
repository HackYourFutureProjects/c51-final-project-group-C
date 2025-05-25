import User from "../../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { logError } from "../../util/logging.js";

export async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  if (!token || !password) {
    return res.status(400).json({ message: "Missing token or password." });
  }

  try {
    const user = await User.findOne({ resetToken: hashedResetToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (!user.resetTokenExpiresAt || new Date() > user.resetTokenExpiresAt) {
      return res.status(400).json({ message: "Token has expired." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;

    await user.save();

    res
      .status(200)
      .json({ message: "Password has been changed successfully." });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error." });
  }
}
