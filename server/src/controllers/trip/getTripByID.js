import Trip from "../../models/Trip.js";

export const getTripById = async (req, res) => {
  const { tripID } = req.params;

  try {
    const trip = await Trip.findById(tripID)
      .populate({
        path: "days",
        populate: {
          path: "events",
          populate: {
            path: "locations",
          },
        },
      })

      .populate("userID", "name surname");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ errors: err.errors || "Server error" });
  }
};
