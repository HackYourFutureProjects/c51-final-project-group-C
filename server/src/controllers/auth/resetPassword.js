import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { logError } from "../../util/logging.js";

export async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: "Missing token or password." });
  }

  try {
    const user = await User.findOne({ resetPassToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (
      !user.resetPassTokenExpiresAt ||
      new Date() > user.resetPassTokenExpiresAt
    ) {
      return res.status(400).json({ message: "Token has expired." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPassToken = undefined;
    user.resetPassTokenExpiresAt = undefined;

    await user.save();

    res
      .status(200)
      .json({ message: "Password has been changed successfully." });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error." });
  }
}
