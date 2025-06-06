import { LuMessageSquare as NoteIcon } from "react-icons/lu";

const EventNotes = ({ notes }) => {
  if (!notes) return null;

  return (
    <div className="event-notes max-w-full sm:max-w-[400px] mt-4 p-3 sm:p-4 rounded-lg border border-border">
      <div className="notes-header flex items-center mb-2">
        <NoteIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mr-2" />
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          Notes
        </span>
      </div>
      <p className="text-text text-xs sm:text-sm italic">{notes}</p>
    </div>
  );
};

export default EventNotes;
