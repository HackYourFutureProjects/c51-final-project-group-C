import { useState, useRef, useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import FormError from "./FormError";
import { formatLocation } from "../util/utils";

function LocationSearch({
  value,
  onChange,
  placeholder = "Search for a location...",
  error,
}) {
  const [query, setQuery] = useState(value?.displayName || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { startLoading, stopLoading } = useLoading();
  const timeoutRef = useRef(null);
  const isSelectingRef = useRef(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const searchLocations = async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    startLoading("Searching locations...");
    try {
      const res = await fetch(
        `/api/locations/search?q=${encodeURIComponent(searchQuery)}`,
      );

      if (!res.ok) {
        throw new Error(`Location search failed. Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(
        "Nominatim response (list of locations that mathched search query):",
        data,
      );

      if (!isSelectingRef.current) {
        const formattedData = data.map((item) => ({
          ...item,
          displayName: formatLocation(item),
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
        }));

        setSuggestions(formattedData);
        setShowDropdown(formattedData.length > 0);
      }
    } catch (error) {
      console.error("Error searching locations:", error);
      setSuggestions([]);
      setShowDropdown(false);
    }
    stopLoading();
  };

  const selectLocation = (item) => {
    console.log("Selected location object:", item);
    isSelectingRef.current = true;

    const address = item.address || {};

    const formattedLocation = {
      displayName: formatLocation(item),
      lat: Number(item.lat),
      lng: Number(item.lon),
      placeId: item.place_id ? String(item.place_id) : "",
      city: address.city || address.town || address.village || "",
      country: address.country || "",
    };

    console.log("Formatted location for sving:", formattedLocation);

    setQuery(formattedLocation.displayName);
    setSuggestions([]);
    setShowDropdown(false);

    if (onChange) {
      onChange(formattedLocation);
    }

    setTimeout(() => {
      isSelectingRef.current = false;
    }, 100);
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value !== (value?.displayName || "")) {
      if (onChange) onChange(null);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!value.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      if (!isSelectingRef.current) {
        searchLocations(value);
      }
    }, 300);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full my-2" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <div className="relative w-[350px]">
          <input
            type="text"
            value={query}
            onChange={onInputChange}
            placeholder={placeholder}
            className="border p-1 rounded text-sm w-full bg-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            ref={inputRef}
            spellCheck="false"
          />

          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-10 left-0 mt-1 w-full">
              <ul className="bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => selectLocation(item)}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-b-0"
                  >
                    {item.displayName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <FormError message={error} />
    </div>
  );
}

export default LocationSearch;
