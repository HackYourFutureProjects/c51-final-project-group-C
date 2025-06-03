import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useError } from "../../context/ErrorContext";
import { useLoading } from "../../context/LoadingContext";
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
  const { firstServerError, clearAllServerErrors } = useError();
  const { isLoading } = useLoading();

  const {
    formValues,
    clientValidationError,
    updateField,
    validateRequired,
    validatePasswordMatch,
    clearClientValidationError,
  } = useForm({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordReset = async () => {
    clearClientValidationError();
    clearAllServerErrors();

    if (!validateRequired(["password", "confirmPassword"])) {
      return;
    }

    if (!validatePasswordMatch("password", "confirmPassword")) {
      return;
    }

    try {
      await api.post(
        `/auth/reset-password/${token}`,
        {
          password: formValues.password,
        },
        "Resetting your password",
      );
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      // Errors are already handled in ErrorContext
    }
  };

  const displayErrorMessage = clientValidationError || firstServerError;

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

  return (
    <Modal
      disabled={isLoading}
      isOpen={true}
      title="Set New Password"
      actionLabel="Reset Password"
      onClose={() => {
        clearAllServerErrors();
        clearClientValidationError();
        navigate("/login");
      }}
      onSubmit={handlePasswordReset}
      body={
        <div className="reset-password-form flex flex-col gap-6 py-2">
          <div className="password-input-container relative">
            <Input
              label="New Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formValues.password}
              onChange={(e) => updateField("password", e.target.value)}
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
              onChange={(e) => updateField("confirmPassword", e.target.value)}
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
          {displayErrorMessage && <FormError message={displayErrorMessage} />}
        </div>
      }
    />
  );
};

export default ResetPasswordPage;
