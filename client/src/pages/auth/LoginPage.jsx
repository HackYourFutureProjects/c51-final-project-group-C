import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import { useLoading } from "../../context/LoadingContext";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import FormError from "../../components/FormError";
import { useForm } from "../../hooks/useForm";
import { LuEye as EyeIcon, LuEyeClosed as ClosedEyeIcon } from "react-icons/lu";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isProfileCompleted } = useAuth();
  const { firstServerError, clearAllServerErrors } = useError();
  const { isLoading } = useLoading();

  const {
    formValues,
    clientValidationError,
    updateField,
    validateRequired,
    clearClientValidationError,
  } = useForm({
    email: "",
    password: "",
  });

  // 👇 To clear errors from ErrorContext when component is added to DOM and when removed from it
  useEffect(() => {
    clearAllServerErrors();
    clearClientValidationError();

    return () => {
      clearAllServerErrors();
      clearClientValidationError();
    };
  }, []);

  const handleLogin = async () => {
    clearClientValidationError();
    clearAllServerErrors();

    if (!validateRequired(["email", "password"])) {
      return;
    }

    try {
      await login({
        email: formValues.email.trim(),
        password: formValues.password,
      });

      // 👇 Here we get the URL the user tried to visit so we will redirect him to this page after login
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin");

      if (!isProfileCompleted) {
        navigate("/complete-profile");
      } else if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate("/");
      }
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
      title="Login"
      actionLabel="Continue"
      onClose={() => {
        clearAllServerErrors();
        clearClientValidationError();
        navigate("/");
      }}
      onSubmit={handleLogin}
      body={
        <div className="login-form flex flex-col gap-6 py-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <div className="password-input-container relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
          {displayErrorMessage && <FormError message={displayErrorMessage} />}
        </div>
      }
      footer={
        <div className="login-footer flex flex-col gap-4 mt-3">
          <hr />
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="forgot-password-link text-sm text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="register-prompt text-neutral-500 text-center mt-4 font-light">
            <div className="flex flex-row items-center gap-2 justify-center">
              <div>Don&#39;t have Elva account?</div>
              <Link
                to="/register"
                className="register-link flex items-center gap-2 text-sm text-neutral-800 bg-gray-200 px-3 py-1 rounded-lg cursor-pointer hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default LoginPage;
