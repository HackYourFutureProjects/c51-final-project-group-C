import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../../context/ErrorContext";
import { useLoading } from "../../context/LoadingContext";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { useForm } from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const api = useFetch();
  const { firstServerError, clearAllServerErrors } = useError();
  const { isLoading } = useLoading();

  const {
    formValues,
    clientValidationError,
    updateField,
    validateRequired,
    validateEmail,
    clearClientValidationError,
  } = useForm({
    email: "",
  });

  const handleResetRequest = async () => {
    clearClientValidationError();

    if (!validateRequired(["email"])) {
      return;
    }

    if (!validateEmail("email")) {
      return;
    }

    try {
      await api.post(
        "/auth/forgot-password",
        {
          email: formValues.email.trim(),
        },
        "Sending reset link",
      );
      setEmailSent(true);
    } catch (error) {
      console.error(error);
      // Errors are already handled in ErrorContext
    }
  };

  const displayErrorMessage = clientValidationError || firstServerError;

  if (emailSent) {
    return (
      <Modal
        disabled={isLoading}
        isOpen={true}
        title="Check Your Email"
        actionLabel="Back to Login"
        onClose={() => navigate("/login")}
        onSubmit={() => navigate("/login")}
        body={
          <div className="forgot-password-form flex flex-col gap-4 py-4">
            <p className="forgot-password-form-message text-center text-gray-700">
              If an account with this email exists, you&#39;ll receive a link to
              reset your password. Please check your inbox (or spam folder)
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
      title="Reset Password"
      actionLabel="Send Reset Link"
      onClose={() => {
        clearAllServerErrors();
        clearClientValidationError();
        navigate("/login");
      }}
      onSubmit={handleResetRequest}
      body={
        <div className="forgot-password-form flex flex-col gap-6 py-2">
          <p className="forgot-password-form-message text-center text-gray-600 text-sm">
            Enter your email address and we&#39;ll send you a link to reset your
            password.
          </p>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {displayErrorMessage && <FormError message={displayErrorMessage} />}
        </div>
      }
    />
  );
};

export default ForgotPasswordPage;
