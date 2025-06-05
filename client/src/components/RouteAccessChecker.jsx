import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RouteAccessChecker = ({ children }) => {
  const { user, isAuthenticated, isAuthChecking } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  if (isAuthChecking) return null;

  // 👇 List of auth pages that 'should not work' for logged-in users and redirect to home page
  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
  ];
  const isResetPasswordPage = currentPath.startsWith("/reset-password/");
  const isAuthPage = authPages.includes(currentPath) || isResetPasswordPage;

  // 👇 As long as completing profile is a must after registraition we need this check
  const mustCompleteProfile =
    isAuthenticated &&
    !user?.isProfileCompleted &&
    currentPath !== "/complete-profile";

  // 👇 And then we redirect to complete profile if needed
  if (mustCompleteProfile) {
    return <Navigate to="/complete-profile" replace />;
  }

  // 👇 Redirect authenticated users away from auth pages, as they are not relevant to them
  if (isAuthenticated && user?.isProfileCompleted && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteAccessChecker;
