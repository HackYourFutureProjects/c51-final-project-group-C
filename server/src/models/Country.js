import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: String,
    code: String,
  },
  { collection: "countries" },
);

const Country = mongoose.model("Country", countrySchema);

export default Country;
