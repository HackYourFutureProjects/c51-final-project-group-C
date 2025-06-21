import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";
import icon from "../assets/icon.png";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProtectedNavigation = (path) => {
    navigate(isAuthenticated ? path : "/login");
  };

  return (
    <div className="header-container flex justify-between items-center px-4 py-3 bg-background border-b border-border text-text font-inter fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div
        className="logo text-text font-roboto font-light cursor-pointer text-3xl flex items-center space-x-1"
        onClick={() => navigate("/")}
      >
        <img src={icon} alt="E" className="h-8 w-auto inline-block" />
        <span>LVA</span>
      </div>

      {/* Desktop Links */}
      <nav className="nav-links">
        <ul className="link-list hidden md:flex gap-6 list-none items-center">
          <li>
            <button
              onClick={() => handleProtectedNavigation("/")}
              className="px-4 py-2 text-sm font-medium rounded-md text-text hover:text-white hover:bg-accent transition"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleProtectedNavigation("/create-trip-plan")}
              className="px-4 py-2 text-sm font-medium rounded-md text-text hover:text-white hover:bg-accent transition"
            >
              Create Trip
            </button>
          </li>
          <li>
            <button
              onClick={() => handleProtectedNavigation("/users/me")}
              className="px-4 py-2 text-sm font-medium rounded-md text-text hover:text-white hover:bg-accent transition"
            >
              Profile
            </button>
          </li>
        </ul>
      </nav>

      {/* Right side */}
      <div className="user-area flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleLogout}
              className="logout-link hidden md:inline-block text-accent font-semibold px-3 py-1 rounded-lg border border-accent hover:bg-accent hover:text-white transition duration-200 text-sm md:px-4 md:py-1.5 md:text-base lg:px-5 lg:py-2 lg:text-lg"
            >
              Log out
            </button>

            <button
              onClick={() => navigate("/users/me")}
              className="focus:outline-none transition transform"
            >
              <Avatar
                size="medium"
                src={user?.profileImageUrl}
                withBorder={true}
              />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="
      px-3 py-1 rounded-lg border border-accent text-accent 
      hover:bg-accent hover:text-white transition duration-200 font-medium
      text-sm
      sm:px-4 sm:py-1.5 sm:text-base
      md:px-5 md:py-2 md:text-lg
    "
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="
      px-3 py-1 rounded-lg border border-accent text-accent 
      hover:bg-accent hover:text-white transition duration-200 font-medium
      text-sm
      sm:px-4 sm:py-1.5 sm:text-base
      md:px-5 md:py-2 md:text-lg
    "
            >
              Register
            </button>
          </>
        )}

        {/* Hamburger menu icon */}
        <button
          className="hamburger-toggle md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="hamburger-icon w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu absolute top-full left-0 w-full bg-background shadow-md flex flex-col items-start gap-4 px-4 py-3 md:hidden z-50">
          <button
            onClick={() => {
              handleProtectedNavigation("/");
              toggleMenu();
            }}
            className="mobile-link-home hover:text-accent font-medium"
          >
            Home
          </button>
          <button
            onClick={() => {
              handleProtectedNavigation("/create-trip-plan");
              toggleMenu();
            }}
            className="mobile-link-create-trip hover:text-accent font-medium"
          >
            Create Trip
          </button>
          <button
            onClick={() => {
              handleProtectedNavigation("/users/me");
              toggleMenu();
            }}
            className="mobile-link-profile hover:text-accent font-medium"
          >
            Profile
          </button>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="mobile-link-logout text-accent font-semibold"
            >
              Log out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
