import Country from "../../models/Country.js";

export const getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
