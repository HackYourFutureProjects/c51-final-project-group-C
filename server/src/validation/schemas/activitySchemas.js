import { z } from "zod";
import { nameSchema } from "./commonSchemas.js";

export const createActivitySchema = z.object({
  name: nameSchema,
  notes: z.string().optional(),
});
