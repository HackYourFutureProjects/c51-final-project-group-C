import express from "express";
import { getAllCountries } from "../controllers/country/getAllCountries.js";
import { getCountryById } from "../controllers/country/getCountryById.js";

const countryRouter = express.Router();

countryRouter.get("/", getAllCountries);
countryRouter.get("/:countryID", getCountryById);

export default countryRouter;
