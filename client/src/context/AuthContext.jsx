import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useLoading } from "./LoadingContext";
import { useError } from "./ErrorContext";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const { isLoading } = useLoading();
  const { clearAllServerErrors } = useError();
  const api = useFetch();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/me");
      const userData = {
        ...response.user,
        isProfileCompleted: response.isProfileCompleted,
      };
      setUser(userData);
      return userData;
    } catch (error) {
      // If user is not logged in, we get 401 status code. Technically it's an error, but it's expected behavior, so we don't to show it as an error in UI.
      if (error?.message === "Not authenticated") {
        clearAllServerErrors();
      }
      setUser(null);
      return null;
    } finally {
      setIsAuthChecking(false);
    }
  };

  const login = async (credentials) => {
    await api.post("/auth/login", credentials, "Logging in");
    return await checkAuth();
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", null, "Logging out");
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isProfileCompleted: user?.isProfileCompleted,
        isLoading: isAuthChecking || isLoading,
        checkAuth,
        login,
        logout,
      }}
    >
      {!isAuthChecking && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
