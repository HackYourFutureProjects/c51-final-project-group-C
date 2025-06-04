import { z } from "zod";
import { nameSchema, countryIdArraySchema } from "./commonSchemas.js";

export const createTripModalSchema = z
  .object({
    title: nameSchema,
    duration: z
      .number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
      })
      .int("Duration must be an integer")
      .min(1, "Duration must be at least 1 day")
      .max(60, "Duration must not exceed 60 days"),
    countries: countryIdArraySchema,
  })
  .strict();

export const saveTripSchema = z.object({
  creatorOverview: z
    .string()
    .trim()
    .min(1, "Overview cannot be empty")
    .max(1000, "Overview is too long")
    .optional(),
  creatorRating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating cannot be more than 5")
    .optional(),
});
