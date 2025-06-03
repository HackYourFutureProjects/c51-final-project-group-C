import { useState, useEffect } from "react";
import Select from "react-select";
import FormError from "./FormError";
import useFetch from "../hooks/useFetch";

const CountrySelect = ({
  value,
  onChange,
  error,
  isMulti = true,
  placeholder,
}) => {
  const [options, setOptions] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const api = useFetch();

  useEffect(() => {
    const fetchCountries = async () => {
      setFetchError(null);
      try {
        const data = await api.get(
          "/country/countries",
          "Loading countries...",
        );

        // Converting the data to react-select format
        const formattedData = data.map((country) => ({
          value: country._id,
          label: country.name,
        }));

        setOptions(formattedData);
      } catch (err) {
        console.error("Failed to fetch countries: ", err);
        setFetchError(err.message);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <label className="form-label">{isMulti ? "Countries" : "Country"}</label>
      {options.length === 0 && !fetchError ? (
        <p>Loading countries...</p>
      ) : (
        <>
          <Select
            isMulti={isMulti}
            options={options}
            value={value}
            className="countries-list w-full mb-4"
            onChange={onChange}
            classNamePrefix="react-select"
            placeholder={
              placeholder ||
              (isMulti ? "Select countries/country..." : "Select your country")
            }
          />
          <FormError message={error || fetchError} />
        </>
      )}
    </div>
  );
};

export default CountrySelect;
