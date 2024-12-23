import express, { type Router } from "express";

import { countryController } from "./country.controller";

export const countryRouter: Router = express.Router();

countryRouter.get("/", countryController.fetchCountries);
countryRouter.get("/:code", countryController.getCountry);
