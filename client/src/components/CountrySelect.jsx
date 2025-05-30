import { useState, useEffect } from "react";
import Select from "react-select";
import FormError from "./FormError";

const CountrySelect = ({ value, onChange, error, isMulti = true }) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setFetchError(null);
      try {
        const res = await fetch("/api/country/countries", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await res.json();

        // Converting the data to react-select format
        const formattedData = data.map((country) => ({
          value: country._id,
          label: country.name,
        }));

        setOptions(formattedData);
      } catch (err) {
        console.error("Failed to fetch countries: ", err);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <label className="form-label">Country{isMulti ? "s" : ""}:</label>
      {isLoading ? (
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
              isMulti ? "Select countries/country..." : "Select your country"
            }
          />
          <FormError error={error || fetchError} />
        </>
      )}
    </div>
  );
};

export default CountrySelect;
