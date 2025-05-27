import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const isCompletingProfileNow = location.pathname === "/complete-profile";

  if (!isAuthenticated) {
    // 👇 We save URL user tried to visit so we will redirect him to this page after login
    const currentPath = location.pathname;
    if (currentPath !== "/login") {
      localStorage.setItem("redirectAfterLogin", currentPath);
    }
    return <Navigate to="/login" />;
  }

  if (!isCompletingProfileNow && !user.isProfileCompleted) {
    return <Navigate to="/complete-profile" />;
  }

  if (isCompletingProfileNow && user.isProfileCompleted) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
