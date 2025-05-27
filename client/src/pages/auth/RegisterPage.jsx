import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { LuEye as EyeIcon, LuEyeClosed as ClosedEyeIcon } from "react-icons/lu";
import { useForm } from "../../hooks/useForm";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const { formValues, formErrors, updateFormValue, setFormError } = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async () => {
    if (
      !formValues.email ||
      !formValues.password ||
      !formValues.confirmPassword
    ) {
      setFormError("messageToShow", "Please fill in all fields");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setFormError("messageToShow", "Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await registerUser(formValues);
      setEmailSent(true);
    } catch (error) {
      console.error("Registration error:", error);
      setFormError("messageToShow", "Registration failed. Please try again.");
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
        actionLabel="Back to Home"
        onClose={() => navigate("/")}
        onSubmit={() => navigate("/")}
        body={
          <div className="flex flex-col gap-4 py-4">
            <p className="text-center text-gray-700">
              We&#39;ve sent you an email with a verification link. Please check
              your inbox (or spam folder) and click it to complete registration.
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
      title="Register"
      actionLabel="Continue"
      onClose={() => navigate("/")}
      onSubmit={onSubmit}
      body={
        <div className="register-form flex flex-col gap-6 py-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={(e) => updateFormValue("email", e.target.value)}
          />
          <div className="password-input-container relative">
            <Input
              label="Password"
              placeholder={
                showPassword ? "Enter your password" : "Enter your password"
              }
              type={showPassword ? "text" : "password"}
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
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={
                showPassword ? "Enter your password" : "Enter your password"
              }
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
      footer={
        <div className="register-footer flex flex-col gap-4 mt-3">
          <hr />
          <div className="login-prompt text-neutral-500 text-center mt-4 font-light">
            <div className="flex flex-row items-center gap-2 justify-center">
              <div>Already have an Elva account?</div>
              <Link
                to="/login"
                className="login-link flex items-center gap-2 text-sm text-neutral-800 bg-gray-200 px-3 py-1 rounded-lg cursor-pointer hover:underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default RegisterPage;
