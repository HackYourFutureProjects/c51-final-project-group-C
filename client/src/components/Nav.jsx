import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import GuestImage from "../assets/Guest-image.jpg";
import userImage from "../assets/user.jpg";
const user = false;
const Nav = () => {
  return (
    <div className="Navbar">
      {user ? <p> user name</p> : <p>Guest</p>}
      <ul>
        {user && (
          <Link to="/">
            {" "}
            <li>Home</li>
          </Link>
        )}
        {user && (
          <Link to="/">
            {" "}
            <li>Create trip</li>
          </Link>
        )}
        {user && (
          <Link to="/">
            {" "}
            <li>Profile</li>
          </Link>
        )}
      </ul>
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
