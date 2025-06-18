/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventHeader from "./EventHeader";
import EventDetails from "./EventDetails";
import EventNotes from "./EventNotes";
import EventPhotos from "./EventPhotos";
import TimelineConnector from "./TimelineConnector";

const TripEvent = ({
  activity,
  eventNumber,
  isLastEvent = false,
  isEditable = false,
  onUpdate,
  onDelete,
  defaultOpen = false,
}) => {
  const activityNumber = activity.activityNumber || eventNumber;

  const [isExpanded, setIsExpanded] = useState(
    defaultOpen || activityNumber === 1,
  );
  const [contentHeight, setContentHeight] = useState("auto");
  const [showContent, setShowContent] = useState(isExpanded);

  useEffect(() => {
    if (isExpanded) {
      setShowContent(true);
    } else {
      const timer = setTimeout(() => {
        setShowContent(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const handleUpdate = (updatedData) => {
    if (onUpdate) {
      return onUpdate(updatedData);
    }
    return false;
  };

  const handleDelete = () => {
    if (onDelete) {
      return onDelete();
    }
    return false;
  };

  return (
    <div className="trip-event relative">
      {/* Timeline connector */}
      <TimelineConnector number={activityNumber} isLast={isLastEvent} />

      {/* Event content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="event-content mt-0 ml-16 sm:ml-24 p-3 pt-0 sm:p-5 sm:pt-0 mb-0 transition-shadow duration-300"
      >
        <EventHeader
          activity={activity}
          isEditable={isEditable}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />

        <AnimatePresence initial={false}>
          {(showContent || isExpanded) && (
            <motion.div
              initial={{ height: 0, opacity: 0, overflow: "hidden" }}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
                transition: {
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.3 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2 },
                },
              }}
              className="event-details-container overflow-hidden"
            >
              {/* Details section */}
              <EventDetails
                activity={activity}
                isEditable={isEditable}
                onUpdate={handleUpdate}
                isExpanded={true}
              />

              {/* Notes section */}
              {(activity.notes || isEditable) && (
                <EventNotes
                  notes={activity.notes}
                  isEditable={isEditable}
                  onUpdate={(notes) => handleUpdate({ notes })}
                />
              )}

              {/* Photos section */}
              {activity.activityPhotoUrls?.length > 0 || isEditable ? (
                <EventPhotos
                  photos={activity.activityPhotoUrls || []}
                  isEditable={isEditable}
                  onUpdate={handleUpdate}
                  activityId={activity._id}
                />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TripEvent;
