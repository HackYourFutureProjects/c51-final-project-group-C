import { z } from "zod";
import { titleSchema, countryIdArraySchema } from "./commonSchemas.js";

export const createTripModalSchema = z
  .object({
    title: titleSchema,
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

export const updateTripSchema = z.object({
  title: titleSchema.optional(),
  duration: z
    .number()
    .int("Duration must be an integer")
    .min(1, "Duration must be at least 1 day")
    .max(60, "Duration must not exceed 60 days")
    .optional(),
  countries: countryIdArraySchema.optional(),
  coverPhotoUrl: z.string().url("Must be a valid URL").optional(),
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
