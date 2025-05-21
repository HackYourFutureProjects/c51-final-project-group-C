import User from "../../models/User";

export async function verifyEmail(req, res) {
  const { token } = req.body;

  if (!token) return res.status(400).send("Token is missing.");

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).send("Invalid or expired token.");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send("Email successfully verified! You can now log in.");
  } catch {
    // console.error(err);
    res.status(500).send("Server error");
  }
}
