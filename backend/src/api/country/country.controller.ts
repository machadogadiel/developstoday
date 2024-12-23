import type { Request, RequestHandler, Response } from "express";

import { countryService } from "@/api/country/country.service";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class CountryController {
  public fetchCountries: RequestHandler = async (
    _req: Request,
    res: Response,
  ) => {
    const countries = await countryService.fetchAll();

    return handleServiceResponse(countries, res);
  };

  public getCountry: RequestHandler = async (req: Request, res: Response) => {
    const code: string = req.params.code;
    const serviceResponse = await countryService.findByCode(code);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const countryController = new CountryController();
