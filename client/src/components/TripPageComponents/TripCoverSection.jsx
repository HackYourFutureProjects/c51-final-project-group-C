import { useState, useRef } from "react";
import { LuImage as ImageIcon } from "react-icons/lu";

const TripCoverSection = ({
  coverPhotoUrl,
  isEditable = false,
  onCoverPhotoUpload,
}) => {
  const [isHoveringCover, setIsHoveringCover] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onCoverPhotoUpload(file);
  };

  return (
    <section className="trip-cover-section mb-8">
      {/* Cover photo with upload option */}
      <div
        className="rounded-xl overflow-hidden border border-border mt-4 relative"
        onMouseEnter={() => isEditable && setIsHoveringCover(true)}
        onMouseLeave={() => isEditable && setIsHoveringCover(false)}
      >
        {coverPhotoUrl ? (
          <>
            <img
              src={coverPhotoUrl}
              alt="Trip cover"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
            {isEditable && (
              <div
                className={`dark-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${isHoveringCover ? "opacity-100" : "opacity-0"}`}
              >
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="change-trip-cover-button px-4 py-2 bg-white text-black rounded-lg font-medium"
                >
                  Change Cover Photo
                </button>
              </div>
            )}
          </>
        ) : isEditable ? (
          <div
            className="w-full h-[400px] flex items-center justify-center border cursor-pointer hover:opacity-80"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="text-center">
              <ImageIcon className="w-10 h-10 mx-auto text-gray-400" />
              <span className="text-gray-400 block mt-2">
                Click to upload cover photo
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center border">
            <div className="text-center">
              <ImageIcon className="w-10 h-10 mx-auto text-gray-400" />
              <span className="text-gray-400 block mt-2">
                No cover photo available
              </span>
            </div>
          </div>
        )}
        {isEditable && (
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        )}
      </div>
    </section>
  );
};

export default TripCoverSection;
