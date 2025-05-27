import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { useForm } from "../../hooks/useForm";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const { formValues, formErrors, updateFormValue, setFormError } = useForm({
    email: "",
  });

  const onSubmit = async () => {
    if (!formValues.email) {
      setFormError("messageToShow", "Please enter your email");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formValues.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      setEmailSent(true);
    } catch (error) {
      console.error("Forgot password error:", error);
      setFormError(
        "messageToShow",
        "An error occurred. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

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
      onClose={() => navigate("/login")}
      onSubmit={onSubmit}
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
            onChange={(e) => updateFormValue("email", e.target.value)}
          />
          <FormError error={formErrors.messageToShow} />
        </div>
      }
    />
  );
};

export default ForgotPasswordPage;
