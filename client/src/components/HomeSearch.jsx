import DropDownMenu from "./DropDownMenu";
import Input from "./Input";
const test = ["option1", "option2", "option3"];
const HomeSearch = () => {
  return (
    <>
      <h1 className="flex justify-center mt-20">Welcome!</h1>
      <div className="search-container mt-10 flex justify-center gap-4 flex-wrap p-4">
        <DropDownMenu name="Choose country" items={test} onClick={() => {}} />
        <DropDownMenu name="Choose city" items={test} onClick={() => {}} />
        <DropDownMenu name="Choose duration" items={test} onClick={() => {}} />
        <Input placeholder="Enter trip name" />
      </div>
    </>
  );
};

export default HomeSearch;
