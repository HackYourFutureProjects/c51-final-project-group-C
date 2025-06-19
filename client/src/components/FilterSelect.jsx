import { useState, useEffect } from "react";
import Select from "react-select";
import FormError from "./FormError";
import useFetch from "../hooks/useFetch";
import { useError } from "../context/ErrorContext";
import { useLoading } from "../context/LoadingContext";
import { FilterStyle } from "../styles/FilterSelectStyle";

const FilterSelect = ({
  value,
  onChange,
  error,
  isMulti = true,
  placeholder,
  entity,
  url,
  preSelected,
  isSimple = false, // NEW
}) => {
  const [options, setOptions] = useState([]);
  const api = useFetch();
  const { setServerApiError } = useError();
  const { startLoading, stopLoading, isLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading(`Loading ${entity}...`);
        const data = await api.get(url);

        const formattedData = data.map((item) =>
          isSimple
            ? { value: item, label: item }
            : { value: item._id, label: item.name },
        );

        setOptions(formattedData);

        if (preSelected) {
          const selected = preSelected
            .split(",")
            .map((val) => formattedData.find((c) => c.value === val))
            .filter(Boolean);
          onChange(selected);
        }
      } catch (err) {
        console.error(`Failed to fetch ${entity}: `, err);
        setServerApiError(err.message);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="w-full">
      {isLoading && options.length === 0 ? (
        <p>Loading {entity.toLowerCase()}...</p>
      ) : (
        <>
          <Select
            isMulti={isMulti}
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            classNames={{
              control: ({ isFocused }) =>
                `flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-300 border ${
                  isFocused
                    ? "border-border ring-0 shadow-none"
                    : "border-border"
                } bg-background text-accent hover:opacity-90 focus:outline-none`,
              option: ({ isFocused }) =>
                `px-4 py-2 cursor-pointer text-sm ${
                  isFocused ? "bg-accent/10 text-accent" : "text-gray-700"
                }`,
              menu: () => "bg-white mt-2 rounded-lg shadow-lg z-50",
              multiValue: () => "bg-accent text-white rounded px-2 py-0.5 mr-1",
              multiValueLabel: () => "text-white text-sm",
              multiValueRemove: () => "text-white hover:text-red-200 ml-1",
            }}
            className="w-full"
            styles={FilterStyle}
            components={{ IndicatorSeparator: () => null }}
          />
          <FormError message={error} />
        </>
      )}
    </div>
  );
};

export default FilterSelect;
