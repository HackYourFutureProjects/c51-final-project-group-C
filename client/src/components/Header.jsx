import { useState } from "react";
import { Link } from "react-router-dom";

import userImage from "../assets/user.jpg";

// test user
const user = false;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="header-container flex justify-between items-center px-4 py-3 bg-background border-b border-border text-text font-inter relative ">
      {/* Left side ELVA */}
      <div className="logo text-text font-Lora">ELVA</div>

      {/* Center nav links for the desktop screen size */}
      {user && (
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
                to="/"
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
        {user ? (
          <Link
            to="/"
            className="logout-link hidden md:block text-accent font-semibold"
          >
            Log out
          </Link>
        ) : (
          <Link to="/" className="login-link text-accent font-semibold">
            Log in
          </Link>
        )}
        {user && (
          <img
            src={userImage}
            alt="user"
            className=" user-picture w-10 h-10 rounded-full object-cover border-2 border-border"
          />
        )}

        {user && (
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
      {user && menuOpen && (
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
            to="/"
            className="mobile-link-profile hover:text-accent font-medium"
            onClick={toggleMenu}
          >
            Profile
          </Link>
          <Link
            to="/"
            className="mobile-link-logout text-accent font-semibold"
            onClick={toggleMenu}
          >
            Log out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
