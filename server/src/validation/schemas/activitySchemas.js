import { z } from "zod";

export const createActivitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  notes: z
    .object({
      index: z.number(),
      text: z.string().min(1, "Note text is required"),
    })
    .optional(),
  userID: z.string().min(1, "User ID is required"), // temporary validation for testing
});
