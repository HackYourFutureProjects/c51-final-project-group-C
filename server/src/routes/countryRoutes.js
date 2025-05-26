import express from "express";
import { getAllCountries } from "../controllers/country/getAllCountries.js";

const countryRouter = express.Router();

countryRouter.get("/get-countries", getAllCountries);

export default countryRouter;
