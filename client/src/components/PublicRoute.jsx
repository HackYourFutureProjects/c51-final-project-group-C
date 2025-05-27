import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const isCompletingProfileNow =
    window.location.pathname === "/complete-profile";

  if (isAuthenticated && !user.isProfileCompleted && !isCompletingProfileNow) {
    return <Navigate to="/complete-profile" />;
  }

  if (isAuthenticated && user.isProfileCompleted) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
