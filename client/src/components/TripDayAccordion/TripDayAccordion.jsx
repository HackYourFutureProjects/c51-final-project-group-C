import { useState } from "react";
import Header from "./Header";
import Content from "./Content";

import { CiSquarePlus as AddIcon } from "react-icons/ci";

const TripDayAccordion = ({
  day,
  isEditable = false,
  onUpdate,
  onDelete,
  onAddActivity,
  children,
  defaultOpen = false,
  totalDays = 1,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasActivities = day.activities && day.activities.length > 0;

  return (
    <div className="accordion-container border border-border rounded-2xl mb-4 overflow-hidden transition-all duration-200">
      <Header
        day={day}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEditable={isEditable}
        onUpdate={onUpdate}
        onDelete={onDelete}
        totalDays={totalDays}
      />

      <Content isOpen={isOpen}>
        {children}
        {isEditable && onAddActivity && isOpen && !hasActivities && (
          <div className="flex justify-center mt-2">
            <button
              onClick={onAddActivity}
              className="add-activity-button mt-2 flex items-center gap-2 text-text border border-border rounded-lg px-4 py-2 mx-auto"
            >
              <AddIcon size={20} />
              Add Activity
            </button>
          </div>
        )}

        {isEditable && onAddActivity && isOpen && hasActivities && (
          <button
            onClick={onAddActivity}
            className="add-activity-button mt-4 flex items-center gap-2 text-text border border-border rounded-lg px-4 py-2"
          >
            <AddIcon size={20} />
            Add Activity
          </button>
        )}
      </Content>
    </div>
  );
};

export default TripDayAccordion;
