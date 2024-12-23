import { StatusCodes } from "http-status-codes";

import { CountryRepository } from "@/api/country/country.repository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { Country, CountryDetails } from "./country.model";

export class CountryService {
  private countryRepository: CountryRepository;

  constructor(repository: CountryRepository = new CountryRepository()) {
    this.countryRepository = repository;
  }

  // Retrieves all countries from the database
  async fetchAll() {
    try {
      const countries = await this.countryRepository.fetchAll();

      if (countries && countries.length > 0) {
        return ServiceResponse.success<Country[]>(countries);
      }

      return ServiceResponse.failure(
        null,
        StatusCodes.NOT_FOUND,
        "No countries found.",
      );
    } catch (ex) {
      const errorMessage = `Error finding all countries: $${(ex as Error).message}`;

      logger.error(errorMessage);

      return ServiceResponse.failure(
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An error occurred while retrieving countries.",
      );
    }
  }

  // Retrieves a single country by their ID
  async findByCode(countryCode: string) {
    try {
      const country = await this.countryRepository.findByCode(countryCode);

      if (!country) {
        return ServiceResponse.failure(
          null,
          StatusCodes.NOT_FOUND,
          "Country not found",
        );
      }

      return ServiceResponse.success<CountryDetails>(country);
    } catch (ex) {
      logger.error(
        `Error finding country with code ${countryCode}:, ${(ex as Error).message}`,
      );

      return ServiceResponse.failure(
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An error occurred while finding country.",
      );
    }
  }
}

export const countryService = new CountryService();
