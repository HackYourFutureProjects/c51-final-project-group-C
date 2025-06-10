import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validateData.js";
import {
  uploadFiles,
  handleMulterError,
} from "../middleware/uploadMiddleware.js";
import {
  imageUploadSchema,
  imageDeleteSchema,
} from "../validation/schemas/imageSchemas.js";
import { uploadImage } from "../controllers/images/uploadImage.js";
import { deleteImage } from "../controllers/images/deleteImage.js";

const imageRouter = express.Router();

imageRouter.post(
  "/upload",
  requireAuth,
  uploadFiles,
  handleMulterError,
  validate(imageUploadSchema),
  uploadImage,
);

imageRouter.delete(
  "/delete",
  requireAuth,
  validate(imageDeleteSchema),
  deleteImage,
);

export default imageRouter;
