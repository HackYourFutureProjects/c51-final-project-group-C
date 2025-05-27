import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setError("Verification token is missing");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Email verification failed");
        }

        const data = await response.json();

        setUser(data.user);

        if (!data.user.isProfileCompleted) {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    verifyEmail();
  }, [searchParams, setUser, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">
            Verification Failed.
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
