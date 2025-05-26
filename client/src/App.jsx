import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import EmailVerification from "./pages/auth/EmailVerification";
import CompleteProfileModal from "./pages/auth/CompleteProfileModal";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { Layout } from "./components/Layout";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* 
            Public Routes (accessible to everyone, even without registrartion). Basic logic is like this:
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
            👉 If user is not authenticated -> we redirect to /login (+ we save URL he tried to visit and will redirect him to this page after login)
            👉 If authenticated but profile is incomplete -> redirect to /complete-profile
            👉 If authenticated and profile is complete -> show the page
          */}

          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfileModal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
