import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useError } from "../context/ErrorContext";
import useFetch from "./useFetch";

const useImageUpload = () => {
  const { user, setUser } = useAuth();
  const { clearAllServerErrors } = useError();
  const [error, setError] = useState(null);
  const api = useFetch();

  const validateImage = (file) => {
    // 👇 Clear any previous errors
    setError(null);
    clearAllServerErrors();

    // 👇 File type validation
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return false;
    }

    // 👇 File size validation (max 5mb)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return false;
    }

    return true;
  };

  const uploadProfilePhoto = async (
    file,
    loadingMessage = "Uploading profile photo...",
  ) => {
    if (!file || !validateImage(file)) return null;

    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("type", "profilePhoto");
      formData.append("targetObjectId", user.id);

      const data = await api.post("/images/upload", formData, loadingMessage);

      // 👇 This is to update auth context
      setUser({
        ...user,
        profileImageUrl: data.imageUrls[0],
      });

      return data;
    } catch (err) {
      console.error("Error uploading profile photo:", err);
      setError(err.message || "Failed to upload image");
      return null;
    }
  };

  const deleteProfilePhoto = async (
    loadingMessage = "Deleting profile photo...",
  ) => {
    if (!user?.profileImageUrl) return false;

    try {
      setError(null);
      clearAllServerErrors();

      await api.del(
        "/images/delete",
        {
          type: "profilePhoto",
          targetObjectId: user.id,
          imageUrl: user.profileImageUrl,
        },
        loadingMessage,
      );

      // 👇 Update user context to remove profile image URL
      setUser({
        ...user,
        profileImageUrl: null,
      });

      return true;
    } catch (err) {
      console.error("Error deleting profile photo:", err);
      setError(err.message || "Failed to delete image");
      return false;
    }
  };

  // Generic function for uploading images to any entity
  const uploadImage = async (
    file,
    type,
    targetObjectId,
    loadingMessage = null,
  ) => {
    if (!file || !validateImage(file)) return null;

    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("type", type);
      formData.append("targetObjectId", targetObjectId);

      const data = await api.post(
        "/images/upload",
        formData,
        loadingMessage || `Uploading ${type}...`,
      );

      return data;
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
      setError(err.message || "Failed to upload image");
      return null;
    }
  };

  const deleteImage = async (
    type,
    targetObjectId,
    imageUrl,
    loadingMessage = null,
  ) => {
    if (!imageUrl) return false;

    try {
      setError(null);
      clearAllServerErrors();

      await api.del(
        "/images/delete",
        {
          type,
          targetObjectId,
          imageUrl,
        },
        loadingMessage || `Deleting ${type}...`,
      );

      return true;
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
      setError(err.message || "Failed to delete image");
      return false;
    }
  };

  return {
    uploadProfilePhoto,
    deleteProfilePhoto,
    uploadImage,
    deleteImage,
    error,
  };
};

export default useImageUpload;
