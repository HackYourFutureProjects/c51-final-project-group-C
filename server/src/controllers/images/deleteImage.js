import User from "../../models/User.js";
import Trip from "../../models/Trip.js";
import Activity from "../../models/Activity.js";
import { logError } from "../../util/logging.js";
import imageKitClient from "../../util/imageKitClient.js";
import mongoose from "mongoose";

export const deleteImage = async (req, res) => {
  try {
    const { type, targetObjectId, imageUrl } = req.body;

    // 👇 To convert targetObjectId we got in request body to actual MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(targetObjectId);

    // 👇 And then we update the target object (user, trip or activity) by removing current image url
    let updatedDocument;

    switch (type) {
      case "profilePhoto":
        updatedDocument = await User.findByIdAndUpdate(
          objectId,
          { profileImageUrl: null },
          { new: true },
        );
        break;

      case "tripCover":
        updatedDocument = await Trip.findByIdAndUpdate(
          objectId,
          { coverPhotoUrl: null },
          { new: true },
        );
        break;

      case "activityPhotos":
        updatedDocument = await Activity.findByIdAndUpdate(
          objectId,
          { $pull: { activityPhotoUrls: imageUrl } },
          { new: true },
        );
        break;
    }

    if (!updatedDocument) {
      return res.status(404).json({ message: `${type} target not found` });
    }

    //👇 Remove old image from image hosting if it exists

    try {
      await deleteImageFromImageHosting(imageUrl);
    } catch (deleteError) {
      logError(
        `Failed to delete image from image hosting: ${deleteError.message}`,
      );
    }

    res.status(200).json({
      message: "Image deleted successfully from database",
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ message: "Error deleting image", error: error.message });
  }
};

// 👇 Separate function to delete image from image hosting. We use it both for direct deletion and while uploading new image instead of old one

export const deleteImageFromImageHosting = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const urlParts = imageUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];

    const searchResults = await imageKitClient.listFiles({
      name: fileName,
      limit: 1,
    });

    if (searchResults && searchResults.length > 0) {
      const fileId = searchResults[0].fileId;
      await imageKitClient.deleteFile(fileId);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logError(`Error deleting image from image hosting: ${error.message}`);
    throw error;
  }
};
