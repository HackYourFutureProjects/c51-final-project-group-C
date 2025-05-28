import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
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

  return (
    <div className="header-container flex justify-between items-center px-4 py-3 bg-background border-b border-border text-text font-inter relative ">
      {/* Left side ELVA */}
      <div className="logo text-text font-Lora">ELVA</div>

      {/* Center nav links for the desktop screen size */}
      {isAuthenticated && (
        <nav className="nav-links">
          <ul className="link-list hidden md:flex gap-10 list-none items-center">
            <li>
              <Link to="/" className="home-link hover:text-accent font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="create-trip-link hover:text-accent font-medium"
              >
                Create Trip
              </Link>
            </li>
            <li>
              <Link
                to="/users/me"
                className="profile-link hover:text-accent font-medium"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Right side user image  and the hamburger menu on small screen size */}
      <div className="user-area flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleLogout}
              className="logout-link hidden md:block text-accent font-semibold"
            >
              Log out
            </button>
            <button
              onClick={() => navigate("/users/me")}
              className="focus:outline-none transition transform"
            >
              <Avatar size="small" withBorder={true} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="login-link text-accent font-semibold"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="register-link text-accent font-semibold"
            >
              Register
            </button>
          </>
        )}

        {isAuthenticated && (
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
        )}
      </div>

      {/* hamburger menu for small screen size when user is logged in and the menu is open */}
      {isAuthenticated && menuOpen && (
        <div className="mobile-menu absolute top-full left-0 w-full bg-background shadow-md flex flex-col items-start gap-4 px-4 py-3 md:hidden z-50">
          <Link
            to="/"
            className="mobile-link-home hover:text-accent font-medium"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/"
            className="mobile-link-create-trip hover:text-accent font-medium"
            onClick={toggleMenu}
          >
            Create Trip
          </Link>
          <Link
            to="/users/me"
            className="mobile-link-profile hover:text-accent font-medium"
            onClick={toggleMenu}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="mobile-link-logout text-accent font-semibold"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
