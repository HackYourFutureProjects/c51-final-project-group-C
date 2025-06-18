import { useState } from "react";
import { LuMessageSquare as NoteIcon } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

const EventNotes = ({ notes, isEditable, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notesInput, setNotesInput] = useState(notes || "");

  const handleSaveNotes = async () => {
    if (!onUpdate) return;

    const success = await onUpdate(notesInput);
    if (success) {
      setIsEditing(false);
    }
  };

  if (!notes && !isEditable) return null;

  return (
    <div className="event-notes max-w-full sm:max-w-[400px] mt-4 p-3 sm:p-4 rounded-lg border border-border">
      <div className="notes-header flex items-center justify-between mb-2">
        <div className="flex items-center">
          <NoteIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mr-2" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Notes
          </span>
        </div>

        {isEditable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-accent hover:text-accent-dark"
          >
            <FiEdit size={14} />
          </button>
        )}
      </div>

      {isEditable && isEditing ? (
        <div className="notes-edit-form">
          <textarea
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white"
            placeholder="Add your note about this activity..."
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setNotesInput(notes || "");
              }}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNotes}
              className="px-3 py-1 bg-accent text-white rounded text-sm"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="text-text text-xs sm:text-sm italic">
          {notes ||
            (isEditable ? "No notes yet. Click edit to add notes." : "")}
        </p>
      )}
    </div>
  );
};

export default EventNotes;
