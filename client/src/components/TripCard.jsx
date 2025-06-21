import {
  LuMapPin as LocationIcon,
  LuClock as ClockIcon,
  LuStar as StarIcon,
  LuCopy as CopyIcon,
  LuBookmark as BookmarkIcon,
} from "react-icons/lu";
import Avatar from "./Avatar"; // adjust the path if necessary

const TripCard = ({
  trip = {
    title: "Trip Title",
    coverPhoto: null,
    country: "Country",
    duration: "7 days",
    rating: 8.5,
    timesCopied: 12,
    timesBookmarked: 5,
    userId: {
      name: "John",
      surname: "Doe",
      profileImageUrl: "https://example.com/profile.jpg",
    },
  },
}) => {
  const getFullName = (user) => {
    if (!user) return "Unknown";
    const { name, surname } = user;
    if (!name && !surname) return "Unknown";
    return [name, surname].filter(Boolean).join(" ");
  };

  return (
    <div className="trip-card cursor-pointer border border-border rounded-xl overflow-hidden flex flex-col">
      {/* Trip card image */}
      <div className="trip-card-image w-full h-48">
        {trip.coverPhoto ? (
          <img
            src={trip.coverPhoto}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-background">
            <span className="text-text">Photo</span>
          </div>
        )}
      </div>

      {/* Bottom section with trip details */}
      <div className="p-3 bg-background flex flex-col gap-2">
        <h3 className="trip-card-title font-medium text-base line-clamp-1">
          {trip.title}
        </h3>

        {/* Creator info with avatar */}
        {trip.userId?.name || trip.userId?.surname ? (
          <div className="flex items-center text-xs text-gray-500 italic gap-2">
            <Avatar size="small" src={trip.userId.profileImageUrl} />
            <span>
              <span className="font-semibold text-gray-700">
                {getFullName(trip.userId)}
              </span>
            </span>
          </div>
        ) : null}

        <div className="trip-card-details text-xs text-gray-600">
          <div className="flex items-center h-4 mb-1.5">
            <LocationIcon className="w-3 h-3 mr-1 flex-shrink-0" />
            <span>{trip.country}</span>
          </div>

          <div className="flex items-center h-4 mb-1.5">
            <ClockIcon className="w-3 h-3 mr-1 flex-shrink-0" />
            <span>{trip.duration}</span>
          </div>

          <div className="flex items-center h-4 mb-1 justify-start">
            <StarIcon className="w-3 h-3 mr-1 flex-shrink-0" />
            <span>{trip.rating}/5</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 min-w-0">
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <BookmarkIcon className="w-4 h-4" />
              <span>Bookmarked: {trip.timesBookmarked || 0}</span>
            </div>
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <CopyIcon className="w-4 h-4" />
              <span>Copied: {trip.timesCopied || 0} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
