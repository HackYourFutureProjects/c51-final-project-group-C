import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import { useLoading } from "../../context/LoadingContext";
import useFetch from "../../hooks/useFetch";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { firstServerError, setServerApiError } = useError();
  const { startLoading, stopLoading } = useLoading();
  const api = useFetch();

  const verificationRef = useRef(false);

  useEffect(() => {
    if (verificationRef.current) return;
    verificationRef.current = true;

    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setServerApiError("Verification token is missing");
        return;
      }

      startLoading("Verifying your email");

      try {
        const data = await api.post("/auth/verify-email", { token });

        if (data.user) {
          setUser(data.user);
        }

        if (!data.profileComplete) {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      } catch (error) {
        // 👉 Errors are already handled in ErrorContext, so we don't need to handle them here
        console.error(error);
      } finally {
        stopLoading();
      }
    };

    verifyEmail();
  }, []);

  if (firstServerError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">
            Verification Failed
          </h2>
          <p className="mt-2 text-gray-600">{firstServerError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-accent">
          Verifying your email...
        </h2>
        <p className="mt-2 text-gray-600">
          Please wait while we verify your email address.
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
