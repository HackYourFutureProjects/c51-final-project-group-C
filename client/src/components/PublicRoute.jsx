import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const isCompletingProfileNow = location.pathname === "/complete-profile";

  if (isAuthenticated && !user.isProfileCompleted && !isCompletingProfileNow) {
    return <Navigate to="/complete-profile" />;
  }

  if (isAuthenticated && user.isProfileCompleted) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
