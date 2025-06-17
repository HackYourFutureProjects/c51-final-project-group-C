import { z } from "zod";

// Location schema (inside activity)
const locationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
  city: z.string().optional(),
  country: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  placeId: z.string().optional(),
});

export const createActivitySchema = z
  .object({
    title: z.string().min(1, "Activity title is required"),
    location: locationSchema,
    notes: z.string().optional(),
    price: z.string().optional(),
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5")
      .optional(),
    activityPhotoUrls: z
      .array(z.string())
      .max(3, "Maximum 3 photos allowed")
      .optional(),
    activityNumber: z.number().int().positive().optional(),
    order: z.number().int().positive().optional(),
  })
  .strict();

export const updateActivitySchema = z
  .object({
    title: z.string().min(1, "Activity title is required").optional(),
    location: locationSchema.optional(),
    notes: z.string().optional(),
    price: z.string().optional(),
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5")
      .optional(),
    activityPhotoUrls: z
      .array(z.string())
      .max(3, "Maximum 3 photos allowed")
      .optional(),
    activityNumber: z.number().int().positive().optional(),
    order: z.number().int().positive().optional(),
  })
  .strict();
