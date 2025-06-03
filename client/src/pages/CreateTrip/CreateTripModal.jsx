import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import Modal from "../../components/Modal";
import CountrySelect from "../../components/CountrySelect";
import useFetch from "../../hooks/useFetch";

const CreateTripModal = () => {
  const navigate = useNavigate();
  const api = useFetch();
  const [isOpen, setIsOpen] = useState(true);
  const [duration, setDuration] = useState("");
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const {
    formValues,
    clientValidationError,
    handleFormChange,
    validateRequired,
    clearClientValidationError,
  } = useForm({ title: "" });

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  // Submit the form to start creating the trip
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearClientValidationError();
    setErrors({});

    if (!validateRequired(["title"])) {
      return;
    }

    if (
      !duration ||
      isNaN(duration) ||
      Number(duration) < 1 ||
      Number(duration) > 60
    ) {
      setErrors((prev) => ({
        ...prev,
        duration: "Please enter a valid number between 1 and 60.",
      }));
      return;
    }

    if (!countries || countries.length === 0) {
      setErrors((prev) => ({
        ...prev,
        countries: "Please select at least one country.",
      }));
      return;
    }

    try {
      const countryIds = countries.map((c) => c.value);
      console.log("Submitting payload:", {
        title: formValues.title,
        duration: Number(duration),
        countries: countryIds,
      });

      const newTrip = await api.post(
        "/trip/create-trip",
        {
          title: formValues.title,
          duration: Number(duration),
          countries: countryIds,
        },
        "Creating trip plan...",
      );

      // Redirect the users to the Trip Details Page with navigate
      navigate(`/create-trip-plan/${newTrip._id}/complete`);
    } catch (err) {
      console.error("submit:", err.message);
    }
  };

  const handleInputChange = (key) => (e) => {
    handleFormChange({ target: { id: key, value: e.target.value } });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="New Trip Plan"
      showCloseButton
      preventClose={false}
      body={
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
          {clientValidationError && (
            <FormError message={clientValidationError} />
          )}
          <CountrySelect
            isMulti
            value={countries}
            onChange={(val) => setCountries(val)}
            error={errors.countries}
          />
          <Input
            label="Duration (days)"
            type="number"
            placeholder="Number of days"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            max="60"
            required
          />
          {errors.duration && <FormError message={errors.duration} />}
          <div className="button-container flex justify-center">
            <button
              type="submit"
              className="create-new-trip-button bg-accent text-white px-4 py-2 rounded hover:opacity-90"
            >
              Create New Trip Plan
            </button>
          </div>
        </form>
      }
    />
  );
};

export default CreateTripModal;
