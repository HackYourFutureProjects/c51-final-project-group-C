import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { useForm } from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const api = useFetch();
  const { error, validationErrors, isLoading, resetErrors } = api;

  const { formValues, formErrors, updateFormValue, setFormError, clearFormErrors } = useForm({
    email: "",
  });

  const onSubmit = async () => {
    clearFormErrors();
    
    if (!formValues.email.trim()) {
      setFormError("general", "Please enter your email");
      return;
    }

    try {
      await api.post("/auth/forgot-password", { email: formValues.email.trim() });
      setEmailSent(true);
    } catch (error) {
      // 👉 no need to set error here, useFetch handles it
    }
  };

  const errorToShow = formErrors.general || error;

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
        resetErrors();
        clearFormErrors();
        navigate("/login");
      }}
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
          <FormError error={errorToShow} validationErrors={validationErrors} />
        </div>
      }
    />
  );
};

export default ForgotPasswordPage;
