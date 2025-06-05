import { useState } from "react";
import { motion } from "framer-motion";
import { LuImage as ImageIcon, LuX as CloseIcon } from "react-icons/lu";

const EventPhotos = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos || photos.length === 0) return null;

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoView = () => {
    setSelectedPhoto(null);
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
            </div>
          ))}
        </div>
      </div>

      {/* Full screen photo view after click */}

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
