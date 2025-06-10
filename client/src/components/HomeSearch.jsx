import FilterButton from "./SearchAndFilter/FilterButton";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchAndFilter/SearchInput";
import DropDownMenu from "./DropDownMenu";
const SortBy = ["Rating", "Duration"];

const HomeSearch = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className=" home-message flex justify-center mt-20">Welcome!</h1>
      <div className="search-container m-10 flex justify-center gap-4 flex-wrap p-4">
        <SearchInput />
        <FilterButton
          onClick={() => {
            navigate("/filters");
          }}
        />
        <DropDownMenu onClick={() => {}} name={"Sort by"} items={SortBy} />
      </div>
    </>
  );
};

export default HomeSearch;
