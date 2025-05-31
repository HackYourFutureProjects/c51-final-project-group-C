import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    await api.post("/auth/login", credentials);
    return await checkAuth();
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
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
        isLoading: loading,
        error: api.error,
        validationErrors: api.validationErrors,
        checkAuth,
        login,
        logout,
        resetErrors: api.resetErrors,
      }}
    >
      {!loading && children}
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
