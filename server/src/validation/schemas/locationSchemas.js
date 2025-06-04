import { z } from "zod";

export const createLocationSchema = z.object({
  coordinates: z.object({
    lat: z.number({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be a number",
    }),
    lng: z.number({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be a number",
    }),
  }),
  address: z.string().min(1, "Address is required"),
});
