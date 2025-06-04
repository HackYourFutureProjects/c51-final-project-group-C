import Trip from "../../models/Trip.js";
import Country from "../../models/Country.js";

export const createTrip = async (req, res) => {
  try {
    const { title, duration, countries } = req.body;
    // the user id comes from the cookies
    const userID = req.user.userId;
    if (!userID) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    // this is to check if the front end send true countries ID
    const existingCountries = await Country.countDocuments({
      _id: { $in: countries },
    });
    if (existingCountries !== countries.length) {
      return res
        .status(400)
        .json({ message: "One or more country IDs are invalid." });
    }

    const newTrip = new Trip({
      title,
      duration,
      countries,
      userID,
    });
    // Populate countries with name and code
    const populatedTrip = await Trip.findById(savedTrip._id).populate({
      path: "countries",
      select: "name code",
    });
    const savedTrip = await newTrip.save();
    res.status(201).json(populatedTrip);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
