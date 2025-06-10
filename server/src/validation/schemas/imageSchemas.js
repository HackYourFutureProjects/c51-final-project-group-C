import { z } from "zod";
import { objectIdSchema, urlSchema } from "./commonSchemas.js";

export const imageTypeSchema = z.enum([
  "profilePhoto",
  "tripCover",
  "activityPhotos",
]);

export const imageUploadSchema = z.object({
  type: imageTypeSchema,
  targetObjectId: objectIdSchema,
});

export const imageDeleteSchema = z.object({
  type: imageTypeSchema,
  targetObjectId: objectIdSchema,
  imageUrl: urlSchema,
});
