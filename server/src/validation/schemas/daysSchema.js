import { z } from "zod";
import { nameSchema } from "./commonSchemas.js";
export const createDaySchema = z.object({
  title: nameSchema,
});
