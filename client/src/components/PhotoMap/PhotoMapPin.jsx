import { useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { LuX as CloseIcon } from "react-icons/lu";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PhotoMapPin = ({ activity }) => {
  const { location, activityPhotoUrls } = activity;
  const markerRef = useRef(null);
  const popupRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // 👇 Here we create a custom map pin with first activity photo thumbnail that appears on map
  useEffect(() => {
    if (markerRef.current && activityPhotoUrls?.length > 0) {
      const customIcon = L.divIcon({
        className: "photo-map-pin",
        html: `<div style="width:100%; height:100%; overflow:hidden; border-radius:50%"><img src="${activityPhotoUrls[0]}" alt="${activity.title}" style="width:100%; height:100%; object-fit:cover;" /></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      markerRef.current.setIcon(customIcon);
    }
  }, [markerRef, activityPhotoUrls, activity.title]);

  const handleClosePopup = (e) => {
    e.stopPropagation();

    if (markerRef.current && popupRef.current) {
      markerRef.current.closePopup();
    }
  };

  const handlePhotoClick = (photoUrl) => {
    setSelectedPhoto(photoUrl);
  };

  const closePhotoView = () => {
    setSelectedPhoto(null);
  };

  // 👇 If there are no photos or coordinates, we don't display the marker
  if (!activityPhotoUrls?.length || !location?.lat || !location?.lng) {
    return null;
  }

  // 👇 Set the position of map pin based on activity location coordinates
  const position = [location.lat, location.lng];

  return (
    <>
      <Marker position={position} ref={markerRef}>
        {/* 👇 Popup that appears on click on map pin */}

        <Popup
          ref={popupRef}
          closeButton={false}
          className="photo-map-popup-container"
        >
          <div className="photo-map-popup">
            <div className="photo-map-popup-close" onClick={handleClosePopup}>
              <CloseIcon size={20} />
            </div>

            {/* 👇 Image slider inside popup */}

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop={activityPhotoUrls.length > 1}
              key={activity._id}
            >
              {activityPhotoUrls.map((photoUrl, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => handlePhotoClick(photoUrl)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={photoUrl}
                    alt={`${activity.title} - Photo ${index + 1}`}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Popup>
      </Marker>

      {/* 👇 Fullscreen photo viewer */}

      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-[999] flex items-center justify-center p-4 photomap-fullscreen-viewer"
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
            loading="eager"
          />
        </motion.div>
      )}
    </>
  );
};

export default PhotoMapPin;
