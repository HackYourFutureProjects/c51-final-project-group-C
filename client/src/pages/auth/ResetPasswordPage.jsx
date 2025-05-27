import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { useForm } from "../../hooks/useForm";
import { LuEye as EyeIcon, LuEyeClosed as ClosedEyeIcon } from "react-icons/lu";

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const { formValues, formErrors, updateFormValue, setFormError } = useForm({
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async () => {
    if (!formValues.password || !formValues.confirmPassword) {
      setFormError("messageToShow", "Please fill in all fields");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setFormError("messageToShow", "Passwords do not match");
      return;
    }

    if (formValues.password.length < 8) {
      setFormError(
        "messageToShow",
        "Password must be at least 8 characters long",
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formValues.password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to reset password");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Reset password error:", error);
      setFormError("messageToShow", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Modal
        disabled={isLoading}
        isOpen={true}
        title="Password Reset Successful"
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
      onClose={() => navigate("/login")}
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
          <FormError error={formErrors.messageToShow} />
        </div>
      }
    />
  );
};

export default ResetPasswordPage;
