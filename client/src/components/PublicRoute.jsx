import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useError } from "../context/ErrorContext";

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { clearAllServerErrors } = useError();
  const isCompletingProfileNow =
    window.location.pathname === "/complete-profile";

  if (isAuthenticated && !user.isProfileCompleted && !isCompletingProfileNow) {
    clearAllServerErrors();
    return <Navigate to="/complete-profile" />;
  }

  if (isAuthenticated && user.isProfileCompleted) {
    clearAllServerErrors();
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
