import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message?: string;
  readonly response: T;
  readonly statusCode: number;

  private constructor(
    success: boolean,
    response: T,
    statusCode: number,
    message?: string,
  ) {
    this.success = success;
    this.message = message;
    this.response = response;
    this.statusCode = statusCode;
  }

  static success<T>(response: T, statusCode: number = StatusCodes.OK) {
    return new ServiceResponse(true, response, statusCode);
  }

  static failure<T>(
    response: T,
    statusCode: number,
    message: string,
  ) {
    return new ServiceResponse(false, response, statusCode || StatusCodes.BAD_REQUEST, message);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    response: dataSchema.optional(),
    statusCode: z.number(),
  });
