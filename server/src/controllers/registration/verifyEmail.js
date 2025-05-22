import User from "../../models/User.js";

export async function verifyEmail(req, res) {
  const { token } = req.body;

  if (!token) return res.status(400).send("Token is missing.");

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).send("Invalid token.");

    if (
      user.verificationTokenExpiresAt &&
      new Date() > user.verificationTokenExpiresAt
    ) {
      return res.status(400).send("Token has expired.");
    }

    user.isVerified = true;
    await user.save();

    res.send("Email successfully verified! You can now log in.");
  } catch (err) {
    // console.error(err);
    res.status(500).send("Server error");
  }
}
