import User from "../../models/User.js";
import jwt from "jsonwebtoken";

export async function completeProfile(req, res) {
  const { token, name, surname, country } = req.body;

  if (!token || !name || !surname || !country) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user || !user.isVerified) {
      return res.status(400).json({ message: "Invalid token." });
    }

    if (
      user.verificationTokenExpiresAt &&
      new Date() > user.verificationTokenExpiresAt
    ) {
      return res.status(400).send("Token has expired.");
    }

    user.name = name;
    user.surname = surname;
    user.country = country;
    user.verificationToken = undefined; // clear token after profile completion
    user.verificationTokenExpiresAt = undefined; // clear expiration time as well
    await user.save();

    // Checking if the JWT_SECRET before generating token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret not defined" });
    }

    // Generating JWT token
    const authToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Profile completed successfully.",
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
