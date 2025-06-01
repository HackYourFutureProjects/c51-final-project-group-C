import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useError } from "../context/ErrorContext";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { clearAllServerErrors } = useError();
  const location = useLocation();
  const isCompletingProfileNow = location.pathname === "/complete-profile";

  if (!isAuthenticated) {
    clearAllServerErrors();

    // 👇 We save URL user tried to visit so we will redirect him to this page after login
    const currentPath = location.pathname;
    if (currentPath !== "/login") {
      localStorage.setItem("redirectAfterLogin", currentPath);
    }
    return <Navigate to="/login" />;
  }

  if (!isCompletingProfileNow && !user.isProfileCompleted) {
    clearAllServerErrors();
    return <Navigate to="/complete-profile" />;
  }

  if (isCompletingProfileNow && user.isProfileCompleted) {
    clearAllServerErrors();
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
