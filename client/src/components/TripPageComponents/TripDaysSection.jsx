import { useState } from "react";
import { LuPlus as PlusIcon } from "react-icons/lu";
import TripDayAccordion from "../../components/TripDayAccordion/TripDayAccordion";
import TripEvent from "../../components/TripDayAccordion/TripEvent/TripEvent";
import Modal from "../../components/Modal";

const TripDaysSection = ({
  days = [],
  isEditable = false,
  onAddDay,
  onUpdateDay,
  onDeleteDay,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity,
}) => {
  const [dayToDelete, setDayToDelete] = useState(null);
  const [showDeleteDayModal, setShowDeleteDayModal] = useState(false);

  const confirmDeleteDay = (dayId) => {
    setDayToDelete(dayId);
    setShowDeleteDayModal(true);
  };

  const deleteDay = async () => {
    if (dayToDelete) {
      const success = await onDeleteDay(dayToDelete);
      if (success) {
        setShowDeleteDayModal(false);
        setDayToDelete(null);
      }
    }
  };

  {
    /* Day accordions */
  }

  return (
    <section className="trip-days-section">
      <div className="trip-days space-y-6">
        {days &&
          days.map((day) => (
            <TripDayAccordion
              key={day._id}
              day={day}
              isEditable={isEditable}
              onUpdate={(updatedData) => onUpdateDay(day._id, updatedData)}
              onDelete={() => confirmDeleteDay(day._id)}
              onAddActivity={() => onAddActivity(day._id)}
              totalDays={days.length}
            >
              <div className="day-events">
                {day.activities &&
                  day.activities.map((activity, activityIndex) => (
                    <TripEvent
                      key={activity._id}
                      activity={activity}
                      eventNumber={activityIndex + 1}
                      isLastEvent={activityIndex === day.activities.length - 1}
                      isEditable={isEditable}
                      onUpdate={(updatedData) =>
                        onUpdateActivity(day._id, activity._id, updatedData)
                      }
                      onDelete={() => onDeleteActivity(day._id, activity._id)}
                      defaultOpen={true}
                    />
                  ))}

                {(!day.activities || day.activities.length === 0) && (
                  <div className="pt-6 py-2 text-center text-gray-500 flex flex-col items-center">
                    <p className="mb-2">No activities yet.</p>
                  </div>
                )}
              </div>
            </TripDayAccordion>
          ))}

        {/* Add Day Button */}

        {isEditable && (
          <button
            onClick={onAddDay}
            className="py-2 px-4 rounded-lg flex items-center justify-center gap-2 border border-accent text-accent"
          >
            <PlusIcon /> Add Day
          </button>
        )}
      </div>

      {/* Delete day confirmation modal */}

      <Modal
        isOpen={showDeleteDayModal}
        onClose={() => setShowDeleteDayModal(false)}
        title="Delete Day"
        body={
          <div className="text-center">
            <p className="mb-4">
              Are you sure you want to delete this day? All activities in this
              day will be deleted. This action cannot be undone.
            </p>
          </div>
        }
        actionLabel="Delete"
        onSubmit={deleteDay}
        secondaryAction={() => setShowDeleteDayModal(false)}
        secondaryActionLabel="Cancel"
      />
    </section>
  );
};

export default TripDaysSection;
