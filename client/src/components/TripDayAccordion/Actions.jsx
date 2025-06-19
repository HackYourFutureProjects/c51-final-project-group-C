import { LuX as DeleteIcon } from "react-icons/lu";

const Actions = ({ onDelete }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onDelete) onDelete();
      }}
      className="text-gray-600 hover:text-accent"
    >
      <DeleteIcon size={24} />
    </button>
  );
};

export default Actions;
