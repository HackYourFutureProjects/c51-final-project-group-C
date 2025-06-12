import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import { useLoading } from "../../context/LoadingContext";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import CountrySelect from "../../components/CountrySelect";
import Avatar from "../../components/Avatar";
import { useForm } from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import useImageUpload from "../../hooks/useImageUpload";

const CompleteProfileModal = () => {
  const { user, checkAuth } = useAuth();
  const api = useFetch();
  const { firstServerError } = useError();
  const { isLoading } = useLoading();
  const navigate = useNavigate();
  const {
    uploadProfilePhoto,
    deleteProfilePhoto,
    error: imageError,
  } = useImageUpload();

  const {
    formValues,
    clientValidationError,
    updateField,
    validateRequired,
    clearClientValidationError,
  } = useForm({
    name: user?.name || "",
    surname: user?.surname || "",
    country: user?.country
      ? { value: user.country, label: user.countryName || user.country }
      : null,
  });

  const handleProfileCompletion = async () => {
    clearClientValidationError();

    if (!validateRequired(["name", "surname", "country"])) {
      return;
    }

    try {
      await api.post(
        "/auth/complete-profile",
        {
          name: formValues.name.trim(),
          surname: formValues.surname.trim(),
          country: formValues.country ? formValues.country.label : null,
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

  const handleCountryChange = (selectedCountry) => {
    updateField("country", selectedCountry);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadProfilePhoto(file);
  };

  const handleDeletePhoto = async () => {
    await deleteProfilePhoto();
  };

  const displayErrorMessage =
    clientValidationError || firstServerError || imageError;

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
        <div className="profile-form flex flex-col gap-6">
          {/* Profile photo upload */}
          <div className="flex items-center justify-center gap-4">
            <Avatar size="large" src={user?.profileImageUrl} />
            <div className="flex gap-2">
              <label
                htmlFor="complete-profile-photo-input"
                className={`bg-accent text-white px-4 py-2 rounded cursor-pointer hover:bg-accent/90 text-center text-sm ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isLoading
                  ? "Uploading..."
                  : user?.profileImageUrl
                    ? "Change Photo"
                    : "Add Photo"}
              </label>
              <input
                id="complete-profile-photo-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
              />

              {user?.profileImageUrl && (
                <button
                  onClick={handleDeletePhoto}
                  disabled={isLoading}
                  className="border border-[#bd5151] text-[#bd5151] px-4 py-2 rounded hover:bg-[#e3c5c5] text-sm"
                >
                  Delete Photo
                </button>
              )}
            </div>
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
          <CountrySelect
            isMulti={false}
            value={formValues.country}
            placeholder="Select your country"
            onChange={handleCountryChange}
          />
          {displayErrorMessage && <FormError message={displayErrorMessage} />}
        </div>
      }
    />
  );
};

export default CompleteProfileModal;
