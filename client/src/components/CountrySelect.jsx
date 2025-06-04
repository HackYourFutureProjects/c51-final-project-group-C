import { useState, useEffect } from "react";
import Select from "react-select";
import FormError from "./FormError";
import useFetch from "../hooks/useFetch";
import { useError } from "../context/ErrorContext";
import { useLoading } from "../context/LoadingContext";

const CountrySelect = ({
  value,
  onChange,
  error,
  isMulti = true,
  placeholder,
}) => {
  const [options, setOptions] = useState([]);
  const api = useFetch();
  const { setServerApiError } = useError();
  const { startLoading, stopLoading, isLoading } = useLoading();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        startLoading("Loading Countries...");
        const data = await api.get("/countries");

        // Converting the data to react-select format
        const formattedData = data.map((country) => ({
          value: country._id,
          label: country.name,
        }));

        setOptions(formattedData);
      } catch (err) {
        console.error("Failed to fetch countries: ", err);
        setServerApiError(err.message);
      } finally {
        stopLoading();
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <label className="form-label">{isMulti ? "Countries" : "Country"}</label>
      {isLoading && options.length === 0 ? (
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
          <FormError message={error} />
        </>
      )}
    </div>
  );
};

export default CountrySelect;
