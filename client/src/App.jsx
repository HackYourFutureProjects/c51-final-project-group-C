import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import { LoadingProvider } from "./context/LoadingContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import EmailVerification from "./pages/auth/EmailVerification";
import CompleteProfileModal from "./pages/auth/CompleteProfileModal";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { Layout } from "./components/Layout";
import CreateTripModal from "./pages/CreateTrip/CreateTripModal";
import CompleteTripPage from "./pages/CreateTrip/CompleteTripPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorModal from "./components/ErrorModal";

const App = () => {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <AuthProvider>
          <LoadingSpinner />
          <ErrorModal />
          <Routes>
            <Route element={<Layout />}>
              {/* 
            Public Routes (accessible to everyone, even without registration). Basic logic is like this:
            👉 If user is not registered/logged in - we still show the page, as it is a Public Route
            👉 If logged in but profile is not complete - we always redirect to /complete-profile
            👉 If logged in and profile is completed - we redirect to homepage
          */}

              <Route path="/" element={<Home />}>
                <Route
                  path="login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />

                <Route
                  path="register"
                  element={
                    <PublicRoute>
                      <RegisterPage />
                    </PublicRoute>
                  }
                />

                <Route
                  path="forgot-password"
                  element={
                    <PublicRoute>
                      <ForgotPasswordPage />
                    </PublicRoute>
                  }
                />

                <Route
                  path="reset-password/:token"
                  element={
                    <PublicRoute>
                      <ResetPasswordPage />
                    </PublicRoute>
                  }
                />
              </Route>

              <Route
                path="/verify-email"
                element={
                  <PublicRoute>
                    <EmailVerification />
                  </PublicRoute>
                }
              />

              {/* 
            Protected Routes, require authentication. They work like this:
            👉 If user is authenticated -> Click on Create Trip -> redirect to /create-trip-plan -> show the Create Trip Modal to put the basic inputs
            👉 If user is not authenticated -> we redirect to /login (+ we save URL he tried to visit and will redirect him to this page after login)
            👉 If authenticated but profile is incomplete -> redirect to /complete-profile
            👉 If authenticated and profile is complete -> show the page
          */}
              <Route path="/" element={<Home />}>
                <Route
                  path="/create-trip-plan/:tripId/complete"
                  element={
                    <ProtectedRoute>
                      <CompleteTripPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create-trip-plan"
                  element={
                    <ProtectedRoute>
                      <CreateTripModal />
                    </ProtectedRoute>
                  }
                />
              </Route>
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
            </Route>
          </Routes>
        </AuthProvider>
      </LoadingProvider>
    </ErrorProvider>
  );
};

export default App;
