import { z } from "zod";

export const dayValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  index: z.number().int().nonnegative("Index must be 0 or greater"),
  tripID: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid trip ID"),
});
