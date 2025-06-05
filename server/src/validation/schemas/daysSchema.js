import { z } from "zod";

export const createDaySchema = z.object({
  title: z.string().min(1, "Day title is required"),
  dayNumber: z
    .number()
    .int()
    .nonnegative("Day number must be a non-negative integer"),
});
