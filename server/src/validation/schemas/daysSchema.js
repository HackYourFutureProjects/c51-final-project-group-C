import { z } from "zod";

export const createDaySchema = z.object({
  title: z.string().min(1, "Day title is required"),
  index: z.number().int().nonnegative("Index must be a non-negative integer"),
});
