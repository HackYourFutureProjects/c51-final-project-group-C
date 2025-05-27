import Country from "../../models/Country.js";

export const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
