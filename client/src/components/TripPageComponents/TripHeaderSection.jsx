import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuCalendar as CalendarIcon,
  LuSave as SaveIcon,
  LuX as CancelIcon,
  LuMapPin as LocationIcon,
  LuClock as ClockIcon,
  LuStar as StarIcon,
  LuCopy as CopyIcon,
  LuBookmark as BookmarkIcon,
} from "react-icons/lu";

import { MdLocationCity as CityIcon } from "react-icons/md";

import { FiEdit as EditIcon } from "react-icons/fi";
import Avatar from "../../components/Avatar";
import TripInfoLabel from "../../components/TripInfoLabel";
import { turnDateStringToRelativeFormat } from "../../util/utils";

const TripHeaderSection = ({
  trip,
  isEditable = false,
  isOwner = false,
  onTitleSave,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(trip.title);

  const handleTitleSave = async () => {
    if (!titleInput.trim()) {
      return;
    }

    const success = await onTitleSave(titleInput);
    if (success) {
      setEditingTitle(false);
    }
  };

  const isPublished = trip.isPublished || trip.datePublished;
  const dateToShow = isPublished ? trip.datePublished : trip.createdAt;

  // 👇 To add correct hyperlink to trip creator's profile

  let profileUrl = null;
  if (isOwner) {
    profileUrl = "/users/me";
  } else {
    const userId = trip.user?.id || trip.userId;
    if (userId) {
      profileUrl = `/users/${userId}`;
    }
  }

  let displayName = "Unknown Author";
  if (trip.user?.name || trip.user?.surname) {
    displayName = `${trip.user.name || ""} ${trip.user.surname || ""}`.trim();
    if (isOwner) {
      displayName += " (You)";
    }
  }

  return (
    <section className="trip-header-section mb-8">
      {isOwner && (
        <span className="text-sm border border-accent bg-accent text-white px-3 py-1 rounded-md">
          Your Trip
        </span>
      )}

      {/* Trip Title */}

      <div className="min-h-[80px] flex items-center mt-4 mb-4">
        {isEditable && editingTitle ? (
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="text-3xl md:text-5xl font-bold flex-grow p-2 border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white"
              autoFocus
              style={{ lineHeight: "1.2", height: "80px" }}
            />
            <div className="flex-shrink-0 flex items-center gap-2">
              <button
                onClick={handleTitleSave}
                className="p-2 bg-accent text-white rounded-full"
              >
                <SaveIcon />
              </button>
              <button
                onClick={() => {
                  setEditingTitle(false);
                  setTitleInput(trip.title);
                }}
                className="p-2 bg-gray-300 text-gray-700 rounded-full"
              >
                <CancelIcon />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center w-full">
            <h1
              className="trip-title text-5xl md:text-5xl text-3xl font-bold"
              style={{ lineHeight: "1.2" }}
            >
              {trip.title}
            </h1>
            {isEditable && (
              <button
                onClick={() => setEditingTitle(true)}
                className="ml-4 p-2 text-accent hover:text-accent-dark flex-shrink-0"
              >
                <EditIcon size={24} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="trip-author-stats flex flex-col gap-4 mb-6 text-xs">
        <div className="author-row flex items-center gap-2 whitespace-nowrap">
          <span className="">
            {isPublished ? "Published by" : "Created by"}
          </span>

          {/* User Avatar and Name with Link */}
          <div className="flex items-center">
            {profileUrl ? (
              <Link
                to={profileUrl}
                className="flex items-center gap-2 text-accent hover:underline"
              >
                <Avatar size="small" src={trip.user?.profileImageUrl} />
                <span>{displayName}</span>
              </Link>
            ) : (
              <>
                <Avatar size="small" src={trip.user?.profileImageUrl} />
                <span>{displayName}</span>
              </>
            )}
          </div>

          <div className="published-date flex items-center whitespace-nowrap">
            <CalendarIcon className="w-5 h-5 mx-2" />
            <span>
              {dateToShow
                ? turnDateStringToRelativeFormat(dateToShow)
                : isPublished
                  ? "Not published yet"
                  : "Just now"}
            </span>
          </div>
        </div>

        <div className="trip-general-info flex flex-wrap gap-4 text-xs">
          {trip.countries && trip.countries.length > 0 && (
            <TripInfoLabel
              icon={LocationIcon}
              label={trip.countries.length === 1 ? "Country" : "Countries"}
              value={trip.countries.map((c) => c.name).join(", ")}
            />
          )}

          {trip.cities && trip.cities.length > 0 && (
            <TripInfoLabel
              icon={CityIcon}
              label={trip.cities.length === 1 ? "City" : "Cities"}
              value={trip.cities.join(", ")}
            />
          )}

          <TripInfoLabel
            icon={ClockIcon}
            label="Duration"
            value={`${trip.duration} days`}
          />

          {trip.creatorRating > 0 && (
            <TripInfoLabel
              icon={StarIcon}
              label="Rating"
              value={`${trip.creatorRating}/5`}
            />
          )}

          <TripInfoLabel
            icon={CopyIcon}
            label="Copied"
            value={`${trip.timesCopied || 0} times`}
          />

          <TripInfoLabel
            icon={BookmarkIcon}
            label="Bookmarked"
            value={`${trip.timesBookmarked || 0} times`}
          />
        </div>
      </div>
    </section>
  );
};

export default TripHeaderSection;
