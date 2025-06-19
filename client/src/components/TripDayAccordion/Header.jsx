import { useState } from "react";
import { motion } from "framer-motion";
import Actions from "./Actions";
import { LuChevronDown as ChevronDownIcon } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

const Header = ({
  day,
  isOpen,
  setIsOpen,
  isEditable,
  onUpdate,
  onDelete,
  totalDays = 1,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(day.title);

  const handleSaveTitle = async () => {
    if (!titleInput.trim() || !onUpdate) return;

    const success = await onUpdate({ title: titleInput });
    if (success) {
      setIsEditing(false);
    }
  };

  const handleToggleAccordion = () => {
    if (!isEditing) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className="accordion-header w-full flex justify-between items-center p-4 sm:p-4 cursor-pointer duration-200 text-left"
      onClick={handleToggleAccordion}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
    >
      <div className="accordion flex items-center sm:flex-col w-max sm:items-start gap-4">
        <div className="accordion-title-container flex items-center gap-4 sm:gap-4 flex-shrink-0">
          {/* Day Number */}
          <span className="day-number border border-border px-2 py-1 rounded-md mt-1 w-max flex-shrink-0 font-semibold text-accent">
            Day {day.dayNumber}
          </span>

          {/* Day Title */}
          {isEditable && isEditing ? (
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="border border-border p-2 rounded text-xl font-semibold flex-grow focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white"
                autoFocus
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveTitle();
                }}
                className="px-3 py-1 bg-accent text-white rounded text-xs"
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                  setTitleInput(day.title);
                }}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="accordion-title-text font-semibold text-xl sm:text-3xl">
                {day.title}
              </h3>

              {isEditable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="p-1 text-accent hover:text-accent-dark"
                >
                  <FiEdit size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isEditable && totalDays > 1 && <Actions onDelete={onDelete} />}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0"
        >
          <ChevronDownIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 hover:text-accent" />
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
