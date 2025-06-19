import { useState } from "react";
import { MdEventAvailable as EventIcon } from "react-icons/md";
import {
  LuChevronDown as ExpandIcon,
  LuChevronUp as CollapseIcon,
  LuX as DeleteIcon,
} from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

const EventHeader = ({
  activity,
  isEditable,
  onUpdate,
  onDelete,
  isExpanded,
  setIsExpanded,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(activity.title || "");

  const handleSaveTitle = async () => {
    if (!titleInput.trim() || !onUpdate) return;

    const success = await onUpdate({ title: titleInput });
    if (success) {
      setIsEditing(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!onDelete) return;
    await onDelete();
  };

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="event-title-container flex items-center gap-2 mt-0 mb-3 h-10 sm:h-16">
      <EventIcon className="event-title-icon w-6 h-6 text-accent" />

      {isEditable && isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            className="border border-border p-1 rounded text-lg sm:text-2xl font-semibold focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white"
            autoFocus
          />
          <button
            onClick={handleSaveTitle}
            className="px-3 py-1 bg-accent text-white rounded text-xs"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setTitleInput(activity.title || "");
            }}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex items-center">
            <h4
              className="event-title font-semibold text-lg sm:text-2xl rounded-lg cursor-pointer"
              onClick={handleToggleExpand}
            >
              {activity.title || ""}
            </h4>

            {isEditable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="ml-2 p-1 text-accent hover:text-accent-dark"
              >
                <FiEdit size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isEditable && (
              <button
                onClick={handleDelete}
                className="p-1 text-gray-500 hover:text-accent"
                aria-label="Delete activity"
              >
                <DeleteIcon size={20} />
              </button>
            )}

            <button
              onClick={handleToggleExpand}
              className="p-1 text-gray-500 hover:text-accent"
            >
              {isExpanded ? (
                <CollapseIcon size={16} />
              ) : (
                <ExpandIcon size={16} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventHeader;
