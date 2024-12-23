import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Country = z.infer<typeof CountrySchema>;
export const CountrySchema = z.object({
  id: z.number(),
  name: z.string(),
  countryCode: z.string(),
});

export const CountryDetails = z.object({
  commonName: z.string(),
  officialName: z.string(),
  countryCode: z.string(),
  region: z.string(),
});

export const CountryPoulation = z.object({
  year: z.number(),
  value: z.number(),
});

export type CountryDetails = z.infer<typeof CountryDetailsSchema>;
export const CountryDetailsSchema = z.object({
  commonName: z.string(),
  officialName: z.string(),
  countryCode: z.string(),
  region: z.string(),
  borders: z.object({ arrayofA: z.array(CountryDetails) }),
  flag: z.string(),
  populationHistory: z.object({ arrayofA: z.array(CountryPoulation) }),
});
