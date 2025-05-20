import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import GuestImage from "../assets/Guest-image.jpg";
import userImage from "../assets/user.jpg";
// this is for test if user logged in or not
const user = true;
const Nav = () => {
  return (
    <div className="Navbar">
      {user ? <p> Reyna Conrad </p> : <p>App name</p>}
      {user && (
        <ul>
          <Link to="/">
            {" "}
            <li>Home</li>
          </Link>

          <Link to="/">
            {" "}
            <li>Create trip</li>
          </Link>

          <Link to="/">
            {" "}
            <li>Profile</li>
          </Link>
        </ul>
      )}
      <div className=" Auth-navbar">
        {" "}
        {user ? <Link to="/"> Log out</Link> : <Link to="/"> Login</Link>}
        {user ? (
          <img src={userImage} alt="user pic" />
        ) : (
          <img src={GuestImage} alt="Guest pic" />
        )}
      </div>
    </div>
  );
};

export default Nav;
