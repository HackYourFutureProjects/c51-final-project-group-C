/* eslint-disable no-unused-vars */

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  LuPlus as PlusIcon,
  LuX as CloseIcon,
  LuImage as ImageIcon,
} from "react-icons/lu";
import useImageUpload from "../../../hooks/useImageUpload";

const MAX_PHOTOS = 3;

const EventPhotos = ({ photos = [], isEditable, onUpdate, activityId }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { uploadImage, error: uploadError } = useImageUpload();
  const fileInputRefs = useRef([]);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoView = () => {
    setSelectedPhoto(null);
  };

  const handlePhotoUpload = async (e, index) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      const result = await uploadImage(
        e.target.files[0],
        "activityPhotos",
        activityId,
        "Uploading activity photo...",
      );

      if (result && result.imageUrls && result.imageUrls.length > 0) {
        const newPhotoUrl = result.imageUrls[0];

        if (onUpdate) {
          const updatedPhotos = [...photos, newPhotoUrl];
          await onUpdate({ activityPhotoUrls: updatedPhotos });
        }
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }

    // Reset input value
    e.target.value = "";
  };

  const handleDeletePhoto = async (photoUrl) => {
    if (!onUpdate) return;
    const updatedPhotos = photos.filter((url) => url !== photoUrl);
    await onUpdate({ activityPhotoUrls: updatedPhotos });
  };

  return (
    <>
      <div className="event-photos mt-6 sm:mt-8 pb-6 sm:pb-8">
        <div className="event-photos-header flex items-center mb-3">
          <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-2" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Photos
          </span>
        </div>

        <div className="event-photos-grid grid grid-cols-3 gap-1 sm:gap-2">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="photo-item relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                src={photo}
                alt={`Event photo ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {isEditable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePhoto(photo);
                  }}
                  className="absolute top-1 right-1 bg-black text-white p-1 rounded-full"
                >
                  <CloseIcon size={12} />
                </button>
              )}
            </div>
          ))}

          {isEditable &&
            Array.from({ length: MAX_PHOTOS - photos.length }).map(
              (_, index) => {
                const placeholderIndex = photos.length + index;
                return (
                  <div
                    key={`placeholder-${placeholderIndex}`}
                    className="group photo-placeholder aspect-square border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-accent transition-colors"
                    onClick={() =>
                      fileInputRefs.current[placeholderIndex]?.click()
                    }
                  >
                    <PlusIcon
                      size={32}
                      strokeWidth={1.5}
                      className="text-gray-400 group-hover:text-accent transition-colors"
                    />
                    <input
                      type="file"
                      ref={(el) =>
                        (fileInputRefs.current[placeholderIndex] = el)
                      }
                      onChange={(e) => handlePhotoUpload(e, placeholderIndex)}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                );
              },
            )}
        </div>

        {uploadError && (
          <p className="text-red-500 text-xs mt-2">{uploadError}</p>
        )}
      </div>

      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closePhotoView}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
            onClick={closePhotoView}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
        </motion.div>
      )}
    </>
  );
};

export default EventPhotos;
