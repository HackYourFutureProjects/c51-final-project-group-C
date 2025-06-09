import { FaSliders } from "react-icons/fa6";

const FilterButton = () => {
  return (
    <button
      onClick={() => {}}
      className="
        flex 
        items-center 
        gap-2 
        px-4 
        py-2 
        h-9
        rounded-full 
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
      <FaSliders className="w-5 h-5 text-accent" />
      Filters
    </button>
  );
};

export default FilterButton;
