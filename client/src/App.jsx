import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import { LoadingProvider } from "./context/LoadingContext";
import RouteAccessChecker from "./components/RouteAccessChecker";
import ProtectedRoute from "./components/ProtectedRoute";
import RequireTripOwnershipRoute from "./components/RequireTripOwnershipRoute";
import EmailVerification from "./pages/auth/EmailVerification";
import CompleteProfileModal from "./pages/auth/CompleteProfileModal";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
// import Home from "./pages/Home/Home"; << -- temporarily disabled for testing published trips (use HomePageTest instead)
import HomePageTest from "./pages/Home/HomePageTest";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { Layout } from "./components/Layout";
import CreateTripModal from "./pages/CreateTrip/CreateTripModal";
import TripPage from "./pages/TripPage/TripPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorModal from "./components/ErrorModal";

const App = () => {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <AuthProvider>
          <RouteAccessChecker>
            <LoadingSpinner />
            <ErrorModal />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePageTest />} />

                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route
                  path="forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="reset-password/:token"
                  element={<ResetPasswordPage />}
                />
                <Route path="/verify-email" element={<EmailVerification />} />

                <Route
                  path="/create-trip-plan"
                  element={
                    <ProtectedRoute>
                      <CreateTripModal />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/complete-profile"
                  element={
                    <ProtectedRoute>
                      <CompleteProfileModal />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/users/me"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                <Route path="/users/:userId" element={<ProfilePage />} />

                <Route path="/trips/:tripId" element={<TripPage />} />

                <Route
                  path="/trips/:tripId/edit"
                  element={
                    <ProtectedRoute>
                      <RequireTripOwnershipRoute>
                        <TripPage />
                      </RequireTripOwnershipRoute>
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </RouteAccessChecker>
        </AuthProvider>
      </LoadingProvider>
    </ErrorProvider>
  );
};

export default App;
