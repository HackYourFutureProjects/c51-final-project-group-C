import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { useForm } from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";

const CompleteProfileModal = () => {
  const { user, checkAuth } = useAuth();
  const api = useFetch();
  const { error, validationErrors, isLoading } = api;
  const navigate = useNavigate();

  const { formValues, formErrors, updateFormValue, setFormError, clearFormErrors } = useForm({
    name: user?.name || "",
    surname: user?.surname || "",
    country: user?.country || "",
  });

  const onSubmit = async () => {
    clearFormErrors();
    
    if (!formValues.name.trim() || !formValues.surname.trim() || !formValues.country.trim()) {
      setFormError("general", "Please fill in all fields");
      return;
    }

    try {
      await api.post("/auth/complete-profile", {
        name: formValues.name.trim(),
        surname: formValues.surname.trim(),
        country: formValues.country.trim()
      });
      await checkAuth();
      navigate("/");
    } catch (error) {
      // 👉 Error is handled by useFetch
    }
  };

  const errorToShow = formErrors.general || 
    (error && !error.includes("Not authenticated") ? error : null);

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
          <Input
            label="Country"
            value={formValues.country}
            placeholder="Enter your country"
            onChange={(e) => updateFormValue("country", e.target.value)}
          />
          <FormError error={errorToShow} validationErrors={validationErrors} />
        </div>
      }
    />
  );
};

export default CompleteProfileModal;
