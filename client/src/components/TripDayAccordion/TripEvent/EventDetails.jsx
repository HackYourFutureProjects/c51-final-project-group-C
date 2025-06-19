import { useState } from "react";
import { LuMapPin as LocationIcon } from "react-icons/lu";
import { FaStar as StarIcon } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GrMoney as EventPriceIcon } from "react-icons/gr";
import LocationSearch from "../../LocationSearch";

const EventDetails = ({ activity, isEditable, onUpdate }) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingRating, setIsEditingRating] = useState(false);

  const [locationData, setLocationData] = useState(
    activity.location
      ? {
          displayName: activity.location.name,
          address: activity.location.address,
          lat: activity.location.lat,
          lng: activity.location.lng,
          city: activity.location.city || "",
          country: activity.location.country || "",
          placeId: activity.location.placeId || "",
        }
      : null,
  );

  const [priceInput, setPriceInput] = useState(activity.price || "");
  const [ratingInput, setRatingInput] = useState(activity.rating || 5);

  const handleSaveLocation = async () => {
    if (!locationData || !onUpdate) return;

    const locationObject = {
      name: locationData.displayName,
      city: locationData.city || "",
      country: locationData.country || "",
      lat: Number(locationData.lat) || 0,
      lng: Number(locationData.lng) || 0,
      placeId: locationData.placeId || "",
    };

    const success = await onUpdate({
      location: locationObject,
    });

    if (success) {
      setIsEditingLocation(false);
    }
  };

  const handleSavePrice = async () => {
    if (!onUpdate) return;

    const success = await onUpdate({ price: priceInput });
    if (success) {
      setIsEditingPrice(false);
    }
  };

  const handleSaveRating = async () => {
    if (!onUpdate) return;

    const success = await onUpdate({ rating: Number(ratingInput) });
    if (success) {
      setIsEditingRating(false);
    }
  };

  return (
    <div className="event-details space-y-3">
      {isEditable && isEditingLocation ? (
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <span className="border border-border bg-background px-2 py-1 rounded-lg text-xs">
              Location
            </span>
            <LocationIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-grow">
              <LocationSearch
                value={locationData}
                onChange={setLocationData}
                placeholder="Search for a location"
                label=""
              />
            </div>
            <button
              onClick={handleSaveLocation}
              className="px-2 py-1 bg-accent text-white rounded text-xs"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditingLocation(false);
                setLocationData(
                  activity.location
                    ? {
                        displayName: activity.location.name,
                        address: activity.location.address,
                        lat: activity.location.lat,
                        lng: activity.location.lng,
                        city: activity.location.city || "",
                        country: activity.location.country || "",
                        placeId: activity.location.placeId || "",
                      }
                    : null,
                );
              }}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        activity.location && (
          <div className="flex items-center gap-2">
            <span className="border border-border bg-background px-2 py-1 rounded-lg text-xs">
              Location
            </span>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <LocationIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              <span>{activity.location.name}</span>

              {isEditable && (
                <button
                  onClick={() => setIsEditingLocation(true)}
                  className="ml-1 p-1 text-accent hover:text-accent-dark"
                >
                  <FiEdit size={14} />
                </button>
              )}
            </div>
          </div>
        )
      )}

      {/* Price */}
      {isEditable && isEditingPrice ? (
        <div className="flex items-center gap-2">
          <span className="border border-border bg-background px-2 py-1 rounded-lg text-xs">
            Price
          </span>
          <div className="flex items-center gap-2 flex-grow">
            <EventPriceIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            <input
              type="text"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="border p-1 rounded text-sm w-40 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              placeholder="E.g. 30$ per person"
            />
            <button
              onClick={handleSavePrice}
              className="px-2 py-1 bg-accent text-white rounded text-xs"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditingPrice(false);
                setPriceInput(activity.price || "");
              }}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="border border-border bg-background px-2 py-1 rounded-lg text-xs">
            Price
          </span>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <EventPriceIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            <span>{activity.price || "Not specified"}</span>

            {isEditable && (
              <button
                onClick={() => setIsEditingPrice(true)}
                className="ml-1 p-1 text-accent hover:text-accent-dark"
              >
                <FiEdit size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Rating */}
      {isEditable && isEditingRating ? (
        <div className="flex items-center gap-2">
          <span className="border border-border bg-background px-2 py-1 rounded-lg text-xs">
            Rating
          </span>
          <div className="flex items-center gap-2 flex-grow">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRatingInput(star)}
                className={`p-1 ${star <= ratingInput ? "text-accent" : "text-gray-300"}`}
              >
                <StarIcon size={16} />
              </button>
            ))}
            <button
              onClick={handleSaveRating}
              className="px-2 py-1 bg-accent text-white rounded text-xs"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditingRating(false);
                setRatingInput(activity.rating || 5);
              }}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="border border-border bg-background px-2 py-1 rounded-lg text-xs">
            Rating
          </span>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            {activity.rating ? (
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-3 h-3 ${star <= activity.rating ? "text-accent" : "text-gray-300"}`}
                  />
                ))}
              </div>
            ) : (
              "Not rated"
            )}

            {isEditable && (
              <button
                onClick={() => setIsEditingRating(true)}
                className="ml-1 p-1 text-accent hover:text-accent-dark"
              >
                <FiEdit size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
