import { FaSliders } from "react-icons/fa6";

const FilterButton = ({ onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className="
        relative
        flex 
        items-center 
        gap-2 
        px-4 
        py-2 
        h-9
        rounded-md
        border 
        border-border
        bg-background
        hover:bg-accent/10 
        transition 
        duration-300
        focus:outline-none
        focus:border-accent
        focus:ring-accent
      "
      aria-label="Filter"
    >
      Filters
      <FaSliders className="w-5 h-5 text-accent" />
      {count > 0 && (
        <span
          className="
            absolute 
            -top-3
            -right-2
            text-xs 
            bg-accent 
            text-white 
            w-5 
            h-5
            flex 
            items-center 
            justify-center 
            rounded-full 
            border-2 
            border-white
          "
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default FilterButton;
