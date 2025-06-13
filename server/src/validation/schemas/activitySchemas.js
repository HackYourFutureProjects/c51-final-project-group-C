import { z } from "zod";

export const createActivitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  notes: z
    .object({
      noteNumber: z.number(),
      text: z.string().min(1, "Note text is required"),
    })
    .optional(),
  price: z
    .number()
    .nonnegative("Price must be a non-negative number")
    .optional(),
});

export const updateActivitySchema = createActivitySchema.partial();
