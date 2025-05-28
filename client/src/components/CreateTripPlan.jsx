import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useForm } from "../hooks/useForm";
import Input from "./Input";
import FormError from "./FormError";

const CreateTripPlan = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [error, setError] = useState(null);
  const {
    formValues,
    formErrors,
    handleFormChange,
    setFormError,
    clearFormErrors,
  } = useForm({ title: "", duration: "" });

  useEffect(() => {
    const fetchCountries = async () => {
      setError(null);
      try {
        const res = await fetch("/api/country/countries", {
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
    clearFormErrors();

    if (!formValues.title.trim()) {
      setFormError("title", "Title is required.");
      return;
    }

    if (
      !formValues.duration ||
      isNaN(formValues.duration) ||
      Number(formValues.duration) < 1 ||
      Number(formValues.duration) > 60
    ) {
      setFormError("duration", "Please enter a valid number between 1 and 60.");
      return;
    }

    if (selectedCountries.length === 0) {
      setFormError("countries", "Please select at least one country.");
      return;
    }

    try {
      const countryIds = selectedCountries.map((c) => c.value);

      const res = await fetch("/api/trip/create-trip", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formValues.title,
          duration: Number(formValues.duration),
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
      setFormError("submit", err.message);
    }
  };

  const handleInputChange = (key) => (e) => {
    handleFormChange({ target: { id: key, value: e.target.value } });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="create-trip-modal max-w-md mx-auto space-y-4"
    >
      <Input
        label="Title"
        placeholder="Enter trip title"
        value={formValues.title}
        onChange={handleInputChange("title")}
        required
      />
      <FormError error={formErrors.title} />
      <div className="countries-container">
        <label className="form-label">Countries:</label>
        <Select
          isMulti
          options={countries}
          value={selectedCountries}
          className="countries-list w-full"
          onChange={setSelectedCountries}
          classNamePrefix="react-select"
          placeholder="Select countries/country..."
          required
        />
        <FormError error={formErrors.countries || error} />
      </div>
      <Input
        label="Duration (days)"
        type="number"
        placeholder="Number of days"
        value={formValues.duration}
        onChange={handleInputChange("duration")}
        min="1"
        max="60"
        required
      />
      <FormError error={formErrors.duration} />
      <div className="button-container flex justify-center">
        <button
          type="submit"
          className="create-new-trip-button bg-accent text-white px-4 py-2 rounded hover:opacity-90"
        >
          Create New Trip Plan
        </button>
        <FormError error={formErrors.submit} />
      </div>
    </form>
  );
};

export default CreateTripPlan;
