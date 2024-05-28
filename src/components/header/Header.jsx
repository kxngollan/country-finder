import { useState } from "react";
import { Link } from "react-router-dom";
import { CgDarkMode } from "react-icons/cg";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <nav>
      <Link to="/">
        <h1>Country Finder</h1>
      </Link>
      <div onClick={() => setDarkMode(!darkMode)}>
        <CgDarkMode />
        {"  "} {darkMode ? "Dark Mode" : "Light Mode"}
      </div>
    </nav>
  );
};

export default Header;
