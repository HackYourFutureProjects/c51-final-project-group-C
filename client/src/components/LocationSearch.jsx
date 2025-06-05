import { useState, useEffect } from "react";

const LocationSearch = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value?.display_name || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(inputValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!debounced) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(debounced)}&format=json&limit=5`,
        );

        const data = await res.json();

        setSuggestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [debounced]);

  const handleSelect = (locationObj) => {
    const shortName =
      locationObj.name || locationObj.display_name.split(",")[0];
    setInputValue(shortName);
    setSuggestions([]);
    onChange({
      name: locationObj.name || locationObj.display_name,
      display_name: locationObj.display_name,
      lat: parseFloat(locationObj.lat),
      lon: parseFloat(locationObj.lon),
    });
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a place"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(null); // clear selection if user types again
        }}
        className="border p-2 rounded w-full"
      />
      {isLoading && (
        <div className="text-sm mt-1 text-gray-400">Searching...</div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-48 overflow-y-auto shadow">
          {suggestions.map((place, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-orange-100 cursor-pointer text-sm"
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
