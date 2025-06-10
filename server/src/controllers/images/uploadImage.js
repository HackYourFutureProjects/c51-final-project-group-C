import User from "../../models/User.js";
import Trip from "../../models/Trip.js";
import Activity from "../../models/Activity.js";
import imageKitClient from "../../util/imageKitClient.js";
import { deleteImageFromImageHosting } from "./deleteImage.js";
import mongoose from "mongoose";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { logError } from "../../util/logging.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { type, targetObjectId } = req.body;

    // 👇 To convert targetObjectId we got in request body to valid MongoDB ObjectId
    const objectId = mongoose.Types.ObjectId(targetObjectId);

    // 👇 Check if the target object (user, trip or activity) already has some uploaded image - to remove it after uploading new one
    let existingDocument;
    let existingImageUrl;

    switch (type) {
      case "profilePhoto":
        existingDocument = await User.findById(objectId);
        if (existingDocument && existingDocument.profileImageUrl) {
          existingImageUrl = existingDocument.profileImageUrl;
        }
        break;

      case "tripCover":
        existingDocument = await Trip.findById(objectId);
        if (existingDocument && existingDocument.coverPhotoUrl) {
          existingImageUrl = existingDocument.coverPhotoUrl;
        }
        break;
    }

    // 👇 Uploading part

    const uploadPromises = req.files.map(async (file) => {
      // 👇 This is to generate a folder on image hosting
      const folderOnImageHosting = `/${type}s/${targetObjectId}`;

      // 👇 To give uploaded file a unique name on image hosting
      const uploadedFileExtension = path.extname(file.originalname);
      const fileNameOnImageHosting = `${uuidv4()}${uploadedFileExtension}`;

      return imageKitClient.upload({
        file: file.buffer.toString("base64"),
        fileName: fileNameOnImageHosting,
        folder: folderOnImageHosting,
      });
    });

    // 👇 Wait for all uploads to complete
    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.map((img) => img.url);

    // 👇 And then we update the target object (it can be user, trip or activity) with the newly uploaded image url
    let updatedDocument;

    switch (type) {
      case "profilePhoto":
        updatedDocument = await User.findByIdAndUpdate(
          objectId,
          { profileImageUrl: imageUrls[0] },
          { new: true },
        );
        break;

      case "tripCover":
        updatedDocument = await Trip.findByIdAndUpdate(
          objectId,
          { coverPhotoUrl: imageUrls[0] },
          { new: true },
        );
        break;

      case "activityPhotos":
        updatedDocument = await Activity.findByIdAndUpdate(
          objectId,
          { $push: { activityPhotoUrls: { $each: imageUrls } } },
          { new: true },
        );
        break;
    }

    if (!updatedDocument) {
      return res.status(404).json({
        message: `Document with id ${targetObjectId} not found, can't add ${type}`,
      });
    }

    // 👇 If we replace an existing image, we delete the old one not only from database, but also from image hosting
    if (existingImageUrl) {
      try {
        await deleteImageFromImageHosting(existingImageUrl);
      } catch (deleteError) {
        logError(`Failed to delete old image with URL ${existingImageUrl}`);
      }
    }

    res.status(200).json({
      message: "Images uploaded successfully",
      imageUrls,
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ message: "Error uploading images", error: error.message });
  }
};
