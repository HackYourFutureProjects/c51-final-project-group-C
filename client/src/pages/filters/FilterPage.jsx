import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import RangeSlider from "../../components/SearchAndFilter/RangeSlider";

import TripActionButton from "../../components/TripActionButton";
import FilterSelect from "../../components/FilterSelect";

const FilterPage = () => {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={true}
      title={"Filters"}
      body={
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto sm:max-w-full sm:w-full sm:h-full">
          {/* Filters group */}
          <div className="flex flex-col gap-4 h-full sm:h-auto">
            <RangeSlider />
            <FilterSelect
              url={"/countries"}
              placeholder={"Select country/countries"}
              entity={"Country"}
            />
            <FilterSelect
              url={"/countries"} // Change to cities url when ready
              placeholder={"Select city/cities"}
              entity={"City"}
            />
          </div>
        </div>
      }
      onClose={() => {
        navigate("/");
      }}
      footer={
        <div className="flex justify-between">
          <TripActionButton label={"Clear filters"} />
          <TripActionButton label={"Show results"} isPrimary={true} />
        </div>
      }
    />
  );
};

export default FilterPage;
