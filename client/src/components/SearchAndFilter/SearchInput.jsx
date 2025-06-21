import { FiSearch } from "react-icons/fi";

const SearchInput = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mt-6">
      <input
        value={search || ""}
        onChange={handleChange}
        type="text"
        placeholder="Search trips by title"
        className="
          w-full
          py-3
          pl-4
          pr-12
          rounded-lg
          border
          border-border
          bg-background
          text-text
          placeholder:text-border
          focus:outline-none
          focus:ring-2
          focus:ring-accent
          focus:border-accent
          shadow-sm
          transition
          duration-300
        "
      />
      <span
        aria-label="Search"
        className="
          absolute
          right-4
          top-1/2
          transform
          -translate-y-1/2
          text-border
          hover:text-accent
          transition
          duration-300
        "
      >
        <FiSearch className="w-5 h-5" />
      </span>
    </div>
  );
};

export default SearchInput;
