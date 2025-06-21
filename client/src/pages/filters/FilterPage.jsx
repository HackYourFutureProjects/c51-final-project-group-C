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
  const cityParam = searchParams.get("cities");
  const [durationRange, setDurationRange] = useState(initialDuration);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const buildAndNavigateToQuery = (
    durationRange,
    countries,
    navigate,
    cities,
  ) => {
    const [min, max] = durationRange;
    const durationParam = `duration=${min}-${max}`;

    const countryParam =
      countries.length > 0
        ? `country=${countries.map((c) => c.value).join(",")}`
        : null;
    const cityParam =
      cities.length > 0
        ? `cities=${cities.map((c) => c.value).join(",")}`
        : null;
    const query = [durationParam, countryParam, cityParam]
      .filter(Boolean)
      .join("&");

    navigate(`/?${query}`);
  };
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
            <FilterSelect
              url={"/trips/cities"}
              placeholder={"Select city/cities"}
              entity={"City"}
              value={cities}
              onChange={setCities}
              isSimple={true}
              preSelected={cityParam}
            />
          </div>
        </div>
      }
      onClose={() => {
        buildAndNavigateToQuery(durationRange, countries, navigate, cities);
      }}
      footer={
        <div className="flex justify-between gap-4">
          <TripActionButton
            label={"Clear filters"}
            onClick={() => {
              setDurationRange([1, 50]);
              setCountries([]);
              setCities([]);
              navigate("/");
            }}
          />
          <TripActionButton
            label={"Show results"}
            isPrimary={true}
            onClick={() =>
              buildAndNavigateToQuery(
                durationRange,
                countries,
                navigate,
                cities,
              )
            }
          />
        </div>
      }
    />
  );
};

export default FilterPage;
