import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const CreateTripPlan = () => {
  const [title, setTitle] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/country/get-countries", {
          credentials: "include",
        });

        const data = await res.json();

        // Converting the data to react-select format
        const formattedData = data.map((country) => ({
          value: country._id,
          label: country.name,
        }));
        setCountries(formattedData);
      } catch (err) {
        console.error("Failed to fetch countries: ", err);
      }
    };

    fetchCountries();
  }, []);

  // Submit the form to start creating the trip
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const countryIds = selectedCountries.map((c) => c.value);

      const res = await fetch("/api/trip/create-trip", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          duration: Number(duration),
          countries: countryIds,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const newTrip = await res.json();

      // Redirect the users to the Trip Details Page with navigate
      navigate(`/trip/trip-details/${newTrip._id}`);
    } catch (err) {
      console.error("Error while creating trip: ", err.message);
    }
  };

  // const handleCountryChange = (e) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions);
  //   const selectedIds = selectedOptions.map((opt) => opt.value);
  //   setCountryIds(selectedIds);
  // };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          className="w-full border rounded p-2"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Countries:</label>
        <Select
          isMulti
          options={countries}
          value={selectedCountries}
          className="w-full"
          onChange={setSelectedCountries}
          classNamePrefix="react-select"
          required
        />
      </div>
      <div>
        <label>Duration (days):</label>
        <input
          type="number"
          value={duration}
          className="w-full border rounded p-2"
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90"
        >
          Create New Trip Plan
        </button>
      </div>
    </form>
  );
};

export default CreateTripPlan;
