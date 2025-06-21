import {
  LuMapPin as LocationIcon,
  LuClock as ClockIcon,
  LuStar as StarIcon,
  LuCopy as CopyIcon,
  LuBookmark as BookmarkIcon,
} from "react-icons/lu";
import Avatar from "./Avatar";

const Cards = ({ trip }) => {
  const getFullName = (user) => {
    if (!user) return "Unknown";
    const { name, surname } = user;
    if (!name && !surname) return "Unknown";
    return [name, surname].filter(Boolean).join(" ");
  };

  return (
    <div className="trip-card cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col bg-white border border-gray-200">
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden rounded-t-xl">
        {trip.coverPhoto ? (
          <img
            src={trip.coverPhoto}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-semibold">
            No Photo
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="trip-card-title font-semibold text-lg truncate mb-2">
          {trip.title || "Trip Title"}
        </h3>

        {/* Creator info under title */}
        {trip.userId?.name || trip.userId?.surname ? (
          <div className="flex items-center gap-2 text-sm text-gray-600 italic mb-4">
            <Avatar size="small" src={trip.userId.profileImageUrl} />
            <span>{getFullName(trip.userId)}</span>
          </div>
        ) : null}

        {/* Trip details */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <LocationIcon className="w-4 h-4 text-accent" />
            <span>{trip.country || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4 text-accent" />
            <span>{trip.duration || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-accent" />
            <span>{trip.rating ?? 0}/5</span>
          </div>
        </div>

        {/* Footer stats */}
        <div className="mt-auto flex justify-between text-xs text-gray-500 border-t pt-3">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <BookmarkIcon className="w-4 h-4" />
            <span>Bookmarked: {trip.timesBookmarked || 0}</span>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <CopyIcon className="w-4 h-4" />
            <span>Copied: {trip.timesCopied || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
