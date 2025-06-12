import User from "../../models/User.js";
import { logError } from "../../util/logging.js";

export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isProfileCompleted = Boolean(
      user.name && user.surname && user.country,
    );

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
        surname: user.surname || null,
        country: user.country || null,
        profileImageUrl: user.profileImageUrl || null,
      },
      isProfileCompleted,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ message: "Server error" });
  }
}
