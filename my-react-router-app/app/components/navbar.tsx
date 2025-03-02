import { Link } from "react-router-dom";
import "./navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-navbar">  
        <img src="./app/welcome/logo.png" alt="icon" className="nav-image" />
      </div>
      <div className="right-navbar">
        <div className="sides-clipper">
          <div className="logo">PC Part Flipper</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;