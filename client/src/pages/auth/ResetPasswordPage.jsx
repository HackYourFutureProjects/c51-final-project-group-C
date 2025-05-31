import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { useForm } from "../../hooks/useForm";
import { LuEye as EyeIcon, LuEyeClosed as ClosedEyeIcon } from "react-icons/lu";
import useFetch from "../../hooks/useFetch";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const api = useFetch();
  const { error, validationErrors, isLoading, resetErrors } = api;

  const { formValues, formErrors, updateFormValue, setFormError, clearFormErrors } = useForm({
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async () => {
    clearFormErrors();
    
    if (!formValues.password || !formValues.confirmPassword) {
      setFormError("general", "Please fill in all fields");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setFormError("passwordMatch", "Passwords do not match");
      return;
    }

    try {
      await api.post(`/auth/reset-password/${token}`, { password: formValues.password });
      setIsSuccess(true);
    } catch (error) {
      // no need to set error here, useFetch handles it
    }
  };

  if (isSuccess) {
    return (
      <Modal
        disabled={isLoading}
        isOpen={true}
        title="Password Updated"
        actionLabel="Go to Login"
        onClose={() => navigate("/login")}
        onSubmit={() => navigate("/login")}
        body={
          <div className="flex flex-col gap-4 py-4">
            <p className="text-center text-gray-700">
              Your password has been successfully reset. Please log in with your
              new password.
            </p>
          </div>
        }
      />
    );
  }

  // Determine which error to show
  const errorToShow = formErrors.general || formErrors.passwordMatch || error;

  return (
    <Modal
      disabled={isLoading}
      isOpen={true}
      title="Set New Password"
      actionLabel="Reset Password"
      onClose={() => {
        resetErrors();
        clearFormErrors();
        navigate("/login");
      }}
      onSubmit={onSubmit}
      body={
        <div className="reset-password-form flex flex-col gap-6 py-2">
          <div className="password-input-container relative">
            <Input
              label="New Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formValues.password}
              onChange={(e) => updateFormValue("password", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <ClosedEyeIcon size={20} />
              ) : (
                <EyeIcon size={20} />
              )}
            </button>
          </div>
          <div className="confirm-password-container relative">
            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={formValues.confirmPassword}
              onChange={(e) =>
                updateFormValue("confirmPassword", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="password-toggle absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <ClosedEyeIcon size={20} />
              ) : (
                <EyeIcon size={20} />
              )}
            </button>
          </div>
          <FormError error={errorToShow} validationErrors={validationErrors} />
        </div>
      }
    />
  );
};

export default ResetPasswordPage;
