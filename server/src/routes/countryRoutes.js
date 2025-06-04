import express from "express";
import { getAllCountries } from "../controllers/country/getAllCountries.js";
import { getCountryById } from "../controllers/country/getCountriesById.js";

const countryRouter = express.Router();

countryRouter.get("/", getAllCountries);
countryRouter.get("/:id", getCountryById);

export default countryRouter;
