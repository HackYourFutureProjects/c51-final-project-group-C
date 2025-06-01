import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import { useLoading } from "../../context/LoadingContext";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { useForm } from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";

const CompleteProfileModal = () => {
  const { user, checkAuth } = useAuth();
  const api = useFetch();
  const { firstServerError, clearAllServerErrors } = useError();
  const { isLoading } = useLoading();
  const navigate = useNavigate();

  const {
    formValues,
    clientValidationError,
    updateField,
    validateRequired,
    clearClientValidationError,
  } = useForm({
    name: user?.name || "",
    surname: user?.surname || "",
    country: user?.country || "",
  });

  // 👇 Clear errors from ErrorContext when component is added to  DOM and when removed from it
  useEffect(() => {
    clearAllServerErrors();
    clearClientValidationError();

    return () => {
      clearAllServerErrors();
      clearClientValidationError();
    };
  }, [clearAllServerErrors, clearClientValidationError]);

  const handleProfileCompletion = async () => {
    clearClientValidationError();
    clearAllServerErrors();

    // 👇Check there are no empty fields
    if (!validateRequired(["name", "surname", "country"])) {
      return;
    }

    try {
      await api.post(
        "/auth/complete-profile",
        {
          name: formValues.name.trim(),
          surname: formValues.surname.trim(),
          country: formValues.country.trim(),
        },
        "Completing your profile",
      );

      await checkAuth();
      navigate("/");
    } catch (error) {
      console.error(error);
      // Errors are already handled in ErrorContext
    }
  };

  const displayErrorMessage = clientValidationError || firstServerError;

  return (
    <Modal
      disabled={isLoading}
      isOpen={true}
      title="Complete Your Profile"
      actionLabel="Save"
      showCloseButton={false}
      preventClose={true}
      onSubmit={handleProfileCompletion}
      body={
        <div className="profile-form flex flex-col gap-6 py-2">
          <div className="profile-form-description text-sm text-gray-600 mb-4">
            Please complete your profile to use the application.
          </div>
          <Input
            label="First Name"
            value={formValues.name}
            placeholder="Enter your first name"
            onChange={(e) => updateField("name", e.target.value)}
          />
          <Input
            label="Last Name"
            value={formValues.surname}
            placeholder="Enter your last name"
            onChange={(e) => updateField("surname", e.target.value)}
          />
          <Input
            label="Country"
            value={formValues.country}
            placeholder="Enter your country"
            onChange={(e) => updateField("country", e.target.value)}
          />
          {displayErrorMessage && <FormError message={displayErrorMessage} />}
        </div>
      }
    />
  );
};

export default CompleteProfileModal;
