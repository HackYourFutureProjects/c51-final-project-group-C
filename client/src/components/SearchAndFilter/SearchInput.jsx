import { LuArrowRight } from "react-icons/lu";

const SearchInput = ({ search, setSearch }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        value={search || ""}
        onChange={handleChange}
        type="text"
        placeholder="Search for a trip by name..."
        className="
          w-full 
          pr-12 
          py-2 
          pl-4 
          border 
          border-border
          rounded-full 
          focus:outline-none 
          text-sm
          focus:ring-accent
          focus:border-accent
          transition
          duration-300
        "
      />
      <span
        type="submit"
        aria-label="Search"
        className="
          absolute 
          right-3 
          top-1/2 
          transform 
          -translate-y-1/2 
          text-accent 
          hover:text-accent/80 
          transition 
          duration-300
        "
      >
        <LuArrowRight className="w-6 h-6" />
      </span>
    </div>
  );
};

export default SearchInput;
