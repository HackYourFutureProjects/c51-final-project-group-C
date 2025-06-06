import { motion } from "framer-motion";
import { MdEventAvailable as EventIcon } from "react-icons/md";
import { LuMapPin as LocationIcon, LuStar as StarIcon } from "react-icons/lu";
import { GrMoney as EventPriceIcon } from "react-icons/gr";

import EventDetail from "./EventDetail";
import EventNotes from "./EventNotes";
import EventPhotos from "./EventPhotos";
import TimelineConnector from "./TimelineConnector";

const TripEvent = ({ event, eventNumber, isLastEvent }) => {
  const { title, location, notes, photos, price, rating } = event;

  return (
    <div className="trip-event relative">
      {/* Timeline connector */}
      <TimelineConnector number={eventNumber} isLast={isLastEvent} />

      {/* Event content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="event-content mt-0 ml-16 sm:ml-24 p-3 pt-0 sm:p-5 sm:pt-0 mb-0 transition-shadow duration-300"
      >
        <div className="event-title-container flex items-center gap-2 mt-0 mb-3 h-10 sm:h-16">
          <EventIcon className="event-title-icon w-6 h-6 text-accent" />
          <h4 className="event-title font-semibold text-lg sm:text-2xl rounded-lg">
            {title}
          </h4>
        </div>

        <div className="event-details space-y-3">
          {location && (
            <EventDetail
              label="Location"
              icon={LocationIcon}
              value={`${location.name}, ${location.address}`}
            />
          )}

          {price && (
            <EventDetail label="Price" icon={EventPriceIcon} value={price} />
          )}

          {rating && (
            <EventDetail
              label="Personal Rating"
              icon={StarIcon}
              value={`${rating}/5`}
            />
          )}
        </div>

        <EventNotes notes={notes} />

        <EventPhotos photos={photos} />
      </motion.div>
    </div>
  );
};

export default TripEvent;
