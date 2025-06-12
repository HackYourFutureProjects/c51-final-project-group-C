import { useAuth } from "../context/AuthContext";
import { useError } from "../context/ErrorContext";
import { useLoading } from "../context/LoadingContext";
import useImageUpload from "../hooks/useImageUpload";
import Avatar from "./Avatar";
import FormError from "./FormError";
import { LuUpload as UploadIcon, LuTrash2 as DeleteIcon } from "react-icons/lu";

const ProfilePhotoUploader = () => {
  const { user } = useAuth();
  const { firstServerError } = useError();
  const { isLoading } = useLoading();
  const { uploadProfilePhoto, deleteProfilePhoto, error } = useImageUpload();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await uploadProfilePhoto(file);
  };

  const handleDeletePhoto = async () => {
    await deleteProfilePhoto();
  };

  const displayErrorMessage = error || firstServerError;

  return (
    <div className="profile-photo-uploader-container w-full">
      <div className="flex items-center justify-between gap-4 border border-border rounded-lg p-4 px-6">
        <div className="flex items-center gap-4">
          <p className="text-sm whitespace-nowrap">Profile Photo</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <label
              htmlFor="profile-photo-input"
              className={`flex items-center gap-2 bg-accent text-white px-2 py-1.5 rounded cursor-pointer hover:bg-accent/90 text-center text-xs ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <UploadIcon className="w-4 h-4" />
              {user?.profileImageUrl ? "Change" : "Add"}
            </label>
            <input
              type="file"
              id="profile-photo-input"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
            />

            {user?.profileImageUrl && (
              <button
                onClick={handleDeletePhoto}
                disabled={isLoading}
                className="delete-profile-photo-button flex items-center gap-2 border border-[#bd5151] text-[#bd5151] px-2 py-1.5 rounded hover:bg-[#e3c5c5] text-xs"
              >
                <DeleteIcon className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
          <Avatar size="medium" src={user?.profileImageUrl} />
        </div>
      </div>

      {displayErrorMessage && (
        <div className="mt-3">
          <FormError message={displayErrorMessage} />
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
