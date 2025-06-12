import User from "../../models/User.js";
import { logError } from "../../util/logging.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // 👇 We need this check because we have 'users/me' in URL for own profile and 'users/:userId' for other users' profiles
    if (id === "me") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select(
      "name surname country email profileImageUrl",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    logError("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
