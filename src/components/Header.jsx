import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import du style spécifique au header

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
              alt="Marvel Logo"
            />
          </Link>
        </div>
        <nav className="nav">
          <ul className="menu">
            <li>
              <Link to="/characters">Personnages</Link>
            </li>
            <li>
              <Link to="/comics">Comics</Link>
            </li>
            <li>
              <Link to="/favorites">Favoris</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
