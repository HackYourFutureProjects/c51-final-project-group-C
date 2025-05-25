import User from "../../models/User.js";
import crypto from "crypto";
import { sendResetPassEmail } from "../../util/sendResetPassEmail.js";
import { logError } from "../../util/logging.js";

export async function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "This email does not exists." });
    }

    const resetPassToken = crypto.randomBytes(32).toString("hex");
    const resetPassTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);

    user.resetPassToken = resetPassToken;
    user.resetPassTokenExpiresAt = resetPassTokenExpiresAt;
    await user.save();

    await sendResetPassEmail(email, resetPassToken);

    res.json({ message: "Please check your email to reset your password" });
  } catch (err) {
    logError(err);
    res.status(500).json({ message: "Server error." });
  }
}
