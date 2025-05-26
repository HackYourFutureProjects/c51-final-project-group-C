import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const CreateTripPlan = () => {
  const [title, setTitle] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
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
        setError(err.message);
      }
    };

    fetchCountries();
  }, []);

  // Submit the form to start creating the trip
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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

      // Getting the actual error message from the backend
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const newTrip = await res.json();

      // Redirect the users to the Trip Details Page with navigate
      navigate(`/trip/trip-details/${newTrip._id}`);
    } catch (err) {
      console.error("Error while creating trip: ", err.message);
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="create-trip-modal max-w-md mx-auto space-y-4"
    >
      <div className="trip-title-container">
        <label className="form-label">Title:</label>
        <input
          type="text"
          value={title}
          className="title-input w-full border rounded p-2"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="countries-container">
        <label className="form-label">Countries:</label>
        <Select
          isMulti
          options={countries}
          value={selectedCountries}
          className="countries-list w-full"
          onChange={setSelectedCountries}
          classNamePrefix="react-select"
          required
        />
        {countries.length === 0 && error && (
          <p className="error-message text-red-600 mt-1">{error}</p>
        )}
      </div>
      <div className="trip-duration-container">
        <label className="form-label">Duration (days):</label>
        <input
          type="number"
          value={duration}
          className="duration-input w-full border rounded p-2"
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div className="button-container flex justify-center">
        <button
          type="submit"
          className="create-new-trip-button bg-accent text-white px-4 py-2 rounded hover:opacity-90"
        >
          Create New Trip Plan
        </button>
        {countries.length > 0 && error && (
          <p className="error-message text-red-600 text-center mt-2">{error}</p>
        )}
      </div>
    </form>
  );
};

export default CreateTripPlan;
