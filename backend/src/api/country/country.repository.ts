import type { Country, CountryDetails } from "./country.model";

export class CountryRepository {
  async fetchAll(): Promise<Country[]> {
    const response = await fetch(
      "https://date.nager.at/api/v3/AvailableCountries",
    );

    const users: Country[] = await response.json();

    return users;
  }

  async findByCode(countryCode: string): Promise<CountryDetails | null> {
    const detailsResponse = await fetch(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
    );

    const countryDetails: CountryDetails = await detailsResponse.json();

    console.log(
      JSON.stringify({
        country: countryDetails.commonName.toLowerCase(),
      }),
    );

    const countryPopulationResponse = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population",
      {
        method: "POST",
        body: JSON.stringify({
          country: countryDetails.commonName.toLowerCase(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );

    const countryFlagResponse = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images",
      {
        method: "POST",
        body: JSON.stringify({
          country: countryDetails.commonName.toLowerCase(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    );

    const detailsJson = await countryPopulationResponse.json();
    const flagJson = await countryFlagResponse.json();
    countryDetails.populationHistory = detailsJson.data;
    countryDetails.flag = flagJson.data.flag;

    return countryDetails;
  }
}
