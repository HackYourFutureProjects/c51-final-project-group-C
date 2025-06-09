import FilterButton from "./SearchAndFilter/FilterButton";
import RangeSlider from "./SearchAndFilter/RangeSlider";
import SearchInput from "./SearchAndFilter/SearchInput";

// the onClick function for dropdown will be one for all the options in a one if statement (if item===option 1 do this else if item === option 2 do that )
const HomeSearch = () => {
  return (
    <>
      <h1 className=" home-message flex justify-center mt-20">Welcome!</h1>
      <div className="search-container m-10 flex justify-center gap-4 flex-wrap p-4">
        <SearchInput />
        <FilterButton />
      </div>
      <RangeSlider />
    </>
  );
};

export default HomeSearch;
