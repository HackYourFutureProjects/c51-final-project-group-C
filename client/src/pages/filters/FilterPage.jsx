import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../components/Modal";
import RangeSlider from "../../components/SearchAndFilter/RangeSlider";
import TripActionButton from "../../components/TripActionButton";
import FilterSelect from "../../components/FilterSelect";
import { useState } from "react";

const FilterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const durationParam = searchParams.get("duration");
  const initialDuration = durationParam
    ? durationParam.split("-").map(Number)
    : [1, 50];

  const countryParam = searchParams.get("country");

  const [durationRange, setDurationRange] = useState(initialDuration);
  const [countries, setCountries] = useState([]);

  return (
    <Modal
      isOpen={true}
      title={"Filters"}
      body={
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto sm:max-w-full sm:w-full sm:h-full">
          <div className="flex flex-col gap-4 h-full sm:h-auto">
            <RangeSlider value={durationRange} onChange={setDurationRange} />
            <FilterSelect
              url={"/countries"}
              placeholder={"Select country/countries"}
              entity={"Country"}
              value={countries}
              onChange={setCountries}
              preSelected={countryParam}
            />
          </div>
        </div>
      }
      onClose={() => {
        const [min, max] = durationRange;
        const durationParam = `duration=${min}-${max}`;

        const countryParam =
          countries.length > 0
            ? `country=${countries.map((c) => c.value).join(",")}`
            : null;

        const query = [durationParam, countryParam].filter(Boolean).join("&");

        navigate(`/?${query}`);
      }}
      footer={
        <div className="flex justify-between">
          <TripActionButton
            label={"Clear filters"}
            onClick={() => {
              setDurationRange([1, 50]);
              setCountries([]);
            }}
          />
          <TripActionButton
            label={"Show results"}
            isPrimary={true}
            onClick={() => {
              const [min, max] = durationRange;
              const durationParam = `duration=${min}-${max}`;

              const countryParam =
                countries.length > 0
                  ? `country=${countries.map((c) => c.value).join(",")}`
                  : null;

              const query = [durationParam, countryParam]
                .filter(Boolean)
                .join("&");

              navigate(`/?${query}`);
            }}
          />
        </div>
      }
    />
  );
};

export default FilterPage;
