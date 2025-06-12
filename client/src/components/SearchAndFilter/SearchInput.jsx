import { FiSearch } from "react-icons/fi";
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
        placeholder="Search trips by title"
        className="
          w-full 
          pr-12 
          py-2 
          pl-4 
          border 
          border-border
          rounded-md
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
          text-border 
          hover:text-accent/80 
          transition 
          duration-300
        "
      >
        <FiSearch className="w-6 h-6" />
      </span>
    </div>
  );
};

export default SearchInput;
