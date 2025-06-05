import Trip from "../../models/Trip";

export const deleteTrip = async (req, res) => {
  const tripID = req.params;
  try {
    const trip = await Trip.findById(tripID);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    // This triggers the cascading delete
    await trip.deleteOne();
    res.json({ message: "Trip and related data deleted" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
