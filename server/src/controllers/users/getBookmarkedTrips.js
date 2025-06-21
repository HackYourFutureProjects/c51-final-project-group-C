import User from "../../models/User.js";
import { logError } from "../../util/logging.js";

export const getBookmarkedTrips = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .populate({
        path: "bookmarkedTrips",
        select:
          "coverPhotoUrl title duration creatorRating timesCopied countries",
        populate: { path: "countries", select: "name code" },
      })
      .select("bookmarkedTrips");

    res.status(200).json({ trips: user.bookmarkedTrips });
  } catch (error) {
    logError(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};
