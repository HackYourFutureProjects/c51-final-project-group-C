import { useState } from "react";
import Tabs from "../Tabs";
import PhotoMap from "../PhotoMap/PhotoMap";
import { LuImage as ImageIcon, LuMap as MapIcon } from "react-icons/lu";

const TripCoverOrPhotoMapSection = ({
  coverPhotoUrl,
  days = [],
  isEditable = false,
  onCoverPhotoUpload,
}) => {
  const [activeTabId, setActiveTabId] = useState("cover-photo");
  const [isHoveringCover, setIsHoveringCover] = useState(false);

  const tabItems = [
    { id: "cover-photo", label: "Photo Cover", icon: ImageIcon },
    { id: "photo-map", label: "Photo Map", icon: MapIcon },
  ];

  return (
    <section className="trip-cover-section mb-8">
      {/* Tab buttons */}

      <Tabs
        items={tabItems}
        activeTabId={activeTabId}
        onChange={setActiveTabId}
        type="horizontal"
      />

      {/* Tab content */}

      <div className="rounded-xl overflow-hidden border border-border mt-4">
        {/* Photo cover tab */}
        {activeTabId === "cover-photo" ? (
          isEditable ? (
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringCover(true)}
              onMouseLeave={() => setIsHoveringCover(false)}
            >
              {coverPhotoUrl ? (
                <>
                  <img
                    src={coverPhotoUrl}
                    alt="Trip cover"
                    className="w-full h-[450px] object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${isHoveringCover ? "opacity-100" : "opacity-0"}`}
                  >
                    <label
                      htmlFor="cover-photo-upload"
                      className="px-4 py-2 bg-background text-text rounded-lg font-medium cursor-pointer hover:bg-accent hover:text-background transition-colors"
                    >
                      Change Cover Photo
                    </label>
                  </div>
                </>
              ) : (
                <div className="w-full h-[450px] bg-gray-100 flex items-center justify-center">
                  <label
                    htmlFor="cover-photo-upload"
                    className="px-4 py-2 bg-white text-black rounded-lg font-medium cursor-pointer"
                  >
                    Add Cover Photo
                  </label>
                </div>
              )}

              <input
                id="cover-photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0] && onCoverPhotoUpload) {
                    onCoverPhotoUpload(e.target.files[0]);
                  }
                }}
              />
            </div>
          ) : coverPhotoUrl ? (
            <img
              src={coverPhotoUrl}
              alt="Trip cover"
              className="w-full h-[450px] object-cover"
            />
          ) : (
            <div className="w-full h-[450px] bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No cover photo</span>
            </div>
          )
        ) : (
          <PhotoMap days={days} />
        )}
      </div>
    </section>
  );
};

export default TripCoverOrPhotoMapSection;
