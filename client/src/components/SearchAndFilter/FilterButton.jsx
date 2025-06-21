import { FaSliders } from "react-icons/fa6";

const FilterButton = ({ onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className="
    relative
    flex 
    items-center
    mt-5 
    gap-3 
    px-6 
    py-3 
    rounded-lg
    border 
    border-border
    bg-accent
    text-white
   hover:opacity-90
    transition 
    duration-300
    focus:outline-none
    focus:ring-2
    focus:ring-accent
    focus:border-accent
    font-medium
    select-none
    text-lg
  "
      aria-label="Filter"
    >
      Filters
      <FaSliders className="w-5 h-5 text-white" />
      {count > 0 && (
        <span
          className="
        absolute 
        -top-4
        -right-2
        text-sm 
       bg-background
        text-accent
        w-8
        h-8
        flex 
        items-center 
        justify-center 
        rounded-full 
        border-2 
        border-accent
        font-semibold
      "
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default FilterButton;
