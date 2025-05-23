import DropDownMenu from "./DropDownMenu";
import Input from "./Input";
// this for testing
const test = ["option1", "option2", "option3"];
// the onClick function for dropdown will be one for all the options in a one if statement (if item===option 1 do this else if item === option 2 do that )
const HomeSearch = () => {
  return (
    <>
      <h1 className=" home-message flex justify-center mt-20">Welcome!</h1>
      <div className="search-container m-10 flex justify-center gap-4 flex-wrap p-4">
        <DropDownMenu name="Choose country" items={test} onClick={() => {}} />
        <DropDownMenu name="Choose city" items={test} onClick={() => {}} />
        <DropDownMenu name="Choose duration" items={test} onClick={() => {}} />
        <Input placeholder="Enter trip name" />
      </div>
      <div className="sort-by ml-20">
        <DropDownMenu name="Sort by" items={test} onClick={() => {}} />
      </div>
    </>
  );
};

export default HomeSearch;
