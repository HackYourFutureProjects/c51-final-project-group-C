import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [error, setError] = useState(null);
  const api = useFetch();

  useEffect(() => {
    // 👇 This to attempt verification only once
    if (verificationAttempted) return;

    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setError("Verification token is missing");
        setVerificationAttempted(true);
        return;
      }

      try {
        const data = await api.post("/auth/verify-email", { token });

        if (data.user) {
          setUser(data.user);
        }

        setVerificationAttempted(true);

        if (!data.profileComplete) {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      } catch (err) {
        setError(err.message);
        setVerificationAttempted(true);
      }
    };

    verifyEmail();
  }, [searchParams, api, setUser, navigate, verificationAttempted]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">
            Verification Failed
          </h2>
          <p className="mt-2 text-gray-600">{error}</p>
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
