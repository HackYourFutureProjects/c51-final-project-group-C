import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import CountrySelect from "../../components/CountrySelect";
import { useForm } from "../../hooks/useForm";

const CompleteProfileModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const { formValues, formErrors, updateFormValue, setFormError } = useForm({
    name: user?.name || "",
    surname: user?.surname || "",
    country: user?.country
      ? { value: user.country, label: user.countryName || user.country }
      : null,
  });

  const onSubmit = async () => {
    if (!formValues.name || !formValues.surname || !formValues.country) {
      setFormError("messageToShow", "Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formValues.name,
          surname: formValues.surname,
          country: formValues.country?.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete profile");
      }

      const responseData = await response.json();
      setUser({
        ...user,
        ...responseData.user,
        isProfileCompleted: true,
      });

      navigate("/");
    } catch (error) {
      console.error("Profile completion error:", error);
      setFormError(
        "messageToShow",
        "Failed to complete profile. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryChange = (selectedCountry) => {
    updateFormValue("country", selectedCountry);
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={true}
      title="Complete Your Profile"
      actionLabel="Save"
      showCloseButton={false}
      preventClose={true}
      onSubmit={onSubmit}
      body={
        <div className="profile-form flex flex-col gap-6 py-2">
          <div className="profile-form-description text-sm text-gray-600 mb-4">
            Please complete your profile to use the application.
          </div>
          <Input
            label="First Name"
            value={formValues.name}
            placeholder="Enter your first name"
            onChange={(e) => updateFormValue("name", e.target.value)}
          />
          <Input
            label="Last Name"
            value={formValues.surname}
            placeholder="Enter your last name"
            onChange={(e) => updateFormValue("surname", e.target.value)}
          />
          <CountrySelect
            isMulti={false}
            value={formValues.country}
            placeholder="Select your country"
            onChange={handleCountryChange}
            error={formErrors.country}
          />
          <FormError error={formErrors.messageToShow} />
        </div>
      }
    />
  );
};

export default CompleteProfileModal;
