import {
  LuMapPin as LocationIcon,
  LuClock as ClockIcon,
  LuStar as StarIcon,
  LuCopy as CopyIcon,
} from "react-icons/lu";

const TripCard = ({
  trip = {
    title: "Trip Title",
    coverPhoto: "Photo",
    country: "Country",
    duration: "7 days",
    rating: 8.5,
    timesCopied: 12,
  },
}) => {
  return (
    <div className="trip-card cursor-pointer border-border border rounded-xl overflow-hidden flex flex-col">
      {/* Trip cards image */}

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

      <div className="p-3 bg-background">
        <div className="h-6 mb-2">
          <h3 className="trip-card-title font-medium text-base line-clamp-1">
            {trip.title}
          </h3>
        </div>

        <div className="trip-card-details">
          <div className="flex items-center text-gray-600 h-4 mb-1.5 text-xs">
            <LocationIcon className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="trip-card-country">{trip.country}</span>
          </div>

          <div className="flex items-center text-gray-600 h-4 mb-1.5 text-xs">
            <ClockIcon className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="trip-card-duration">{trip.duration}</span>
          </div>

          <div className="flex items-center justify-between h-4 text-xs">
            <div className="flex items-center text-gray-600">
              <StarIcon className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="trip-card-rating">{trip.rating}/5</span>
            </div>

            <div className="flex items-center text-gray-600">
              <CopyIcon className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="trip-card-times-copied">
                Copied {trip.timesCopied} times
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
