import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const { user, isProfileCompleted } = await response.json();
          setUser({
            ...user,
            isProfileCompleted,
          });
        } else if (response.status === 401) {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const meResponse = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!meResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const { user, isProfileCompleted } = await meResponse.json();
      setUser({
        ...user,
        isProfileCompleted,
      });

      return { user, isProfileCompleted };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isProfileCompleted: user?.isProfileCompleted,
        login,
        register,
        logout,
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
